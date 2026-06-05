import { homeTemplate } from '../../Components/Atomic/Templates/HomeTemplate.js';
import { newsCard } from '../../Components/Atomic/Molecules/NewsCard.js';

const API_BASE_URL = 'http://localhost:3000';
const ARTICLES_ENDPOINT = `${API_BASE_URL}/api/articles`;
const FALLBACK_IMAGE = './assets/images/logo.png';

const app = document.getElementById('app');

const formatDate = (dateValue) => {
  if (!dateValue) return 'Tanggal belum tersedia';

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const getImageUrl = (thumbnail) => {
  if (!thumbnail) return FALLBACK_IMAGE;
  if (thumbnail.startsWith('http://') || thumbnail.startsWith('https://')) return thumbnail;
  if (thumbnail.startsWith('/')) return `${API_BASE_URL}${thumbnail}`;
  return `${API_BASE_URL}/${thumbnail}`;
};

const getPublishedArticles = (articles) => {
  return [...articles]
    .filter((article) => String(article.status || '').toLowerCase() === 'published')
    .sort((a, b) => {
      const timeA = new Date(a.date || a.createdAt || 0).getTime();
      const timeB = new Date(b.date || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
};

const loadLatestNews = async () => {
  const newsGrid = document.getElementById('news-grid');
  if (!newsGrid) return;

  try {
    const response = await fetch(ARTICLES_ENDPOINT);
    const payload = await response.json();

    if (!response.ok || payload.status !== 'success') {
      throw new Error(payload.message || 'Gagal mengambil data artikel.');
    }

    const articles = getPublishedArticles(Array.isArray(payload.data) ? payload.data : []).slice(0, 3);

    if (!articles.length) {
      newsGrid.innerHTML = `
        <div class="md:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding text-on-surface-variant">
          Belum ada artikel yang dipublikasikan.
        </div>
      `;
      return;
    }

    newsGrid.innerHTML = articles.map((article) => newsCard({
      image: getImageUrl(article.thumbnail),
      tagClass: 'bg-primary/10 text-primary',
      tagLabel: article.type || 'Artikel',
      date: formatDate(article.date),
      title: article.title || 'Artikel tanpa judul',
      description: article.summary || 'Ringkasan artikel belum tersedia.',
      href: `./articles.html?slug=${encodeURIComponent(article.slug || article.id || '')}`
    })).join('');
  } catch (error) {
    newsGrid.innerHTML = `
      <div class="md:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding text-on-surface-variant">
        Artikel belum bisa dimuat. Jalankan backend di http://localhost:3000.
      </div>
    `;
  }
};

if (app) {
  app.innerHTML = homeTemplate();
  loadLatestNews();

  const updateScrollSpy = () => {
    const links = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 150; // offset for header

    let currentSectionId = '';
    let maxOffset = -1;

    links.forEach(link => {
      const targetId = link.getAttribute('data-target');
      if (!targetId) return;
      const section = document.getElementById(targetId);
      if (section && section.offsetTop <= scrollPosition) {
        if (section.offsetTop > maxOffset) {
          maxOffset = section.offsetTop;
          currentSectionId = targetId;
        }
      }
    });

    // Fallback to the first section if at the very top or no section found
    if (window.scrollY < 50 && links.length > 0) {
      currentSectionId = links[0].getAttribute('data-target');
    }

    links.forEach(link => {
      if (link.getAttribute('data-target') === currentSectionId) {
        link.classList.remove('text-on-surface-variant', 'border-transparent', 'hover:border-outline-variant');
        link.classList.add('text-primary', 'font-bold', 'border-secondary-container');
      } else {
        link.classList.remove('text-primary', 'font-bold', 'border-secondary-container');
        link.classList.add('text-on-surface-variant', 'border-transparent', 'hover:border-outline-variant');
      }
    });
  };

  window.addEventListener('scroll', () => {
    const header = document.getElementById('site-header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    }
    updateScrollSpy();
  });

  // Initialize on load
  setTimeout(updateScrollSpy, 100);

  // Hamburger Menu Logic
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });
  }

  // Carousel Logic
  const carousel = document.getElementById('programs-carousel');
  const indicators = document.querySelectorAll('#carousel-indicators button');
  if (carousel && indicators.length) {
    const updateIndicators = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (maxScroll <= 0) return;

      const scrollPercentage = carousel.scrollLeft / maxScroll;
      let activeIndex = Math.round(scrollPercentage * (indicators.length - 1));

      if (activeIndex < 0) activeIndex = 0;
      if (activeIndex >= indicators.length) activeIndex = indicators.length - 1;

      indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.className = 'transition-all rounded-full bg-primary w-6 h-2.5';
        } else {
          indicator.className = 'transition-all rounded-full bg-outline-variant w-2.5 h-2.5';
        }
      });
    };

    carousel.addEventListener('scroll', updateIndicators);
    // Initial call in case of resizing or pre-scrolled
    setTimeout(updateIndicators, 100);

    // Make dots clickable
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        const cards = carousel.querySelectorAll('.program-card');
        if (cards[index]) {
          carousel.scrollTo({
            left: cards[index].offsetLeft - carousel.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}
