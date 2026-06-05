import { header } from '../../Components/Atomic/Organisms/Header.js';
import { footer } from '../../Components/Atomic/Organisms/Footer.js';

const API_BASE_URL = 'http://localhost:3000';
const ARTICLES_ENDPOINT = `${API_BASE_URL}/api/articles`;
const FALLBACK_IMAGE = `${API_BASE_URL}/uploads/noimage.jpg`;

const app = document.getElementById('app');
const state = {
    articles: [],
    keyword: '',
    type: 'all',
    isLoading: true,
    error: ''
};
let searchRenderTimer;

const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

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

const sanitizeArticleContent = (html = '') => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(String(html), 'text/html');
    const allowedTags = new Set(['H2', 'H3', 'P', 'STRONG', 'EM', 'UL', 'OL', 'LI', 'BR', 'A']);

    const walk = (node) => {
        [...node.children].forEach((child) => {
            if (!allowedTags.has(child.tagName)) {
                const text = document.createTextNode(child.textContent || '');
                child.replaceWith(text);
                return;
            }

            [...child.attributes].forEach((attribute) => child.removeAttribute(attribute.name));
            if (child.tagName === 'A') {
                child.setAttribute('target', '_blank');
                child.setAttribute('rel', 'noopener noreferrer');
            }
            walk(child);
        });
    };

    walk(doc.body);
    return doc.body.innerHTML;
};

const sortArticles = (articles) => [...articles].sort((a, b) => {
    const timeA = new Date(a.date || a.createdAt || 0).getTime();
    const timeB = new Date(b.date || b.createdAt || 0).getTime();
    return timeB - timeA;
});

const getPublishedArticles = () => {
    return sortArticles(state.articles).filter((article) => {
        const status = String(article.status || '').toLowerCase();
        return !status || status === 'published';
    });
};

const getFilteredArticles = () => {
    const keyword = state.keyword.trim().toLowerCase();

    return getPublishedArticles().filter((article) => {
        const matchesType = state.type === 'all' || article.type === state.type;
        const searchable = [
            article.title,
            article.summary,
            article.author,
            article.type
        ].join(' ').toLowerCase();

        return matchesType && (!keyword || searchable.includes(keyword));
    });
};

const getArticleSlug = () => new URLSearchParams(window.location.search).get('slug');

const setPageTitle = (title = 'Artikel') => {
    document.title = `${title} | Politeknik Negeri Jakarta`;
};

const renderShell = (content) => {
    app.innerHTML = `
    ${header({ linkPrefix: './index.html', activePage: 'articles' })}
    ${content}
    ${footer()}
  `;
    bindMobileMenu();
};

const bindMobileMenu = () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });
};

const renderLoading = () => {
    renderShell(`
    <main class="min-h-screen">
      <section class="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding">
          <p class="text-on-surface-variant">Memuat artikel dari backend...</p>
        </div>
      </section>
    </main>
  `);
};

const renderError = () => {
    renderShell(`
    <main class="min-h-screen">
      <section class="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
        <a href="./index.html#berita" class="inline-flex items-center gap-2 text-primary font-label-md mb-8">
          <span class="material-symbols-outlined text-[20px]">arrow_back</span>
          Kembali ke beranda
        </a>
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding">
          <p class="text-label-sm font-bold text-primary mb-2">Backend tidak dapat diakses</p>
          <h1 class="font-headline-lg text-headline-lg mb-3">Artikel belum bisa dimuat</h1>
          <p class="text-on-surface-variant">${escapeHtml(state.error || 'Jalankan backend di http://localhost:3000 lalu muat ulang halaman ini.')}</p>
        </div>
      </section>
    </main>
  `);
};

const renderArticleCard = (article) => {
    const title = escapeHtml(article.title || 'Artikel tanpa judul');
    const summary = escapeHtml(article.summary || 'Ringkasan artikel belum tersedia.');
    const type = escapeHtml(article.type || 'Artikel');
    const slug = encodeURIComponent(article.slug || article.id || '');
    const imageUrl = escapeHtml(getImageUrl(article.thumbnail));

    return `
    <article class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden group">
      <a href="./articles.html?slug=${slug}" class="block h-full">
        <div class="h-56 bg-surface-container-low overflow-hidden flex items-center justify-center">
          <img class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            src="${imageUrl}"
            alt="${title}"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';" />
        </div>
        <div class="p-card-padding">
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">${type}</span>
            <span class="text-label-sm text-on-surface-variant">${formatDate(article.date)}</span>
          </div>
          <h2 class="font-title-lg text-title-lg text-on-background mb-3 group-hover:text-primary transition-colors">${title}</h2>
          <p class="text-body-md text-on-surface-variant mb-5">${summary}</p>
          <span class="inline-flex items-center gap-2 text-primary font-label-md">
            Baca selengkapnya
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </span>
        </div>
      </a>
    </article>
  `;
};

const renderListPage = () => {
        setPageTitle('Artikel');
        const articles = getFilteredArticles();
        const types = ['all', ...new Set(getPublishedArticles().map((article) => article.type).filter(Boolean))];

        renderShell(`
    <main class="min-h-screen">
      <section class="bg-surface-container-low py-14 border-b border-outline-variant">
        <div class="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
          <p class="text-label-sm font-bold text-primary uppercase mb-3">Pusat Informasi</p>
          <div class="max-w-3xl">
            <h1 class="font-display-lg text-[36px] md:text-display-lg leading-tight mb-4">Artikel Kampus PNJ</h1>
            <p class="text-body-lg text-on-surface-variant">Berita, prestasi, dan informasi akademik terbaru.</p>
          </div>
        </div>
      </section>

      <section class="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
        <div class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
          <div class="relative w-full lg:max-w-md">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input id="article-search" type="search" value="${escapeHtml(state.keyword)}"
              class="w-full rounded-lg border-outline-variant bg-surface-container-lowest pl-12 pr-4 py-3 focus:border-primary focus:ring-primary"
              placeholder="Cari artikel" />
          </div>
          <div id="article-type-filter" class="flex gap-2 overflow-x-auto pb-1">
            ${types.map((type) => `
              <button class="article-filter whitespace-nowrap rounded-full px-4 py-2 text-label-md border transition-colors ${state.type === type ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary'}"
                data-type="${escapeHtml(type)}">
                ${type === 'all' ? 'Semua' : escapeHtml(type)}
              </button>
            `).join('')}
          </div>
        </div>

        ${articles.length
          ? `<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">${articles.map(renderArticleCard).join('')}</div>`
          : `<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding text-on-surface-variant">Tidak ada artikel yang cocok dengan filter saat ini.</div>`
        }
      </section>
    </main>
  `);

  bindListEvents();
};

const bindListEvents = () => {
  const searchInput = document.getElementById('article-search');
  const filterButtons = document.querySelectorAll('.article-filter');

  searchInput?.addEventListener('input', (event) => {
    const cursorPosition = event.target.selectionStart;
    state.keyword = event.target.value;
    clearTimeout(searchRenderTimer);
    searchRenderTimer = setTimeout(() => {
      renderListPage();
      const nextInput = document.getElementById('article-search');
      nextInput?.focus();
      nextInput?.setSelectionRange(cursorPosition, cursorPosition);
    }, 180);
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.type = button.dataset.type || 'all';
      renderListPage();
    });
  });
};

const incrementArticleView = async (article) => {
  if (!article?.id) return;

  try {
    await fetch(`${ARTICLES_ENDPOINT}/view?id=${encodeURIComponent(article.id)}`, {
      method: 'POST'
    });
  } catch {
    // View counter is secondary; article detail should stay readable.
  }
};

const renderDetailPage = async (slug) => {
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    setPageTitle('Artikel tidak ditemukan');
    renderShell(`
      <main class="min-h-screen">
        <section class="max-w-[960px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
          <a href="./articles.html" class="inline-flex items-center gap-2 text-primary font-label-md mb-8">
            <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            Semua artikel
          </a>
          <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding">
            <h1 class="font-headline-lg text-headline-lg mb-3">Artikel tidak ditemukan</h1>
            <p class="text-on-surface-variant">Slug artikel tidak tersedia di data backend saat ini.</p>
          </div>
        </section>
      </main>
    `);
    return;
  }

  await incrementArticleView(article);
  setPageTitle(article.title || 'Detail Artikel');
  const imageUrl = escapeHtml(getImageUrl(article.thumbnail));

  renderShell(`
    <main class="min-h-screen">
      <article>
        <section class="max-w-[960px] mx-auto px-container-margin-mobile md:px-container-margin-desktop pt-10 pb-8">
          <a href="./articles.html" class="inline-flex items-center gap-2 text-primary font-label-md mb-8">
            <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            Semua artikel
          </a>
          <div class="flex flex-wrap items-center gap-2 mb-5">
            <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">${escapeHtml(article.type || 'Artikel')}</span>
            <span class="text-label-sm text-on-surface-variant">${formatDate(article.date)}</span>
            <span class="text-label-sm text-on-surface-variant">Oleh ${escapeHtml(article.author || 'Admin')}</span>
          </div>
          <h1 class="font-display-lg text-[34px] md:text-display-lg leading-tight mb-5">${escapeHtml(article.title || 'Artikel tanpa judul')}</h1>
          <p class="text-body-lg text-on-surface-variant">${escapeHtml(article.summary || '')}</p>
        </section>
        <section class="max-w-[1120px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
          <div class="bg-surface-container h-[280px] md:h-[440px] rounded-xl overflow-hidden border border-outline-variant">
            <img class="w-full h-full object-contain"
              src="${imageUrl}"
              alt="${escapeHtml(article.title || 'Artikel')}"
              onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';" />
          </div>
        </section>
        <section class="max-w-[820px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
          <div class="article-content">${sanitizeArticleContent(article.content || `<p>${escapeHtml(article.summary || 'Konten artikel belum tersedia.')}</p>`)}</div>
        </section>
      </article>
    </main>
  `);
};

const fetchArticles = async () => {
  const response = await fetch(ARTICLES_ENDPOINT);
  const payload = await response.json();

  if (!response.ok || payload.status !== 'success') {
    throw new Error(payload.message || 'Gagal mengambil data artikel.');
  }

  return Array.isArray(payload.data) ? payload.data : [];
};

const fetchArticleBySlug = async (slug) => {
  try {
    const response = await fetch(`${ARTICLES_ENDPOINT}?slug=${encodeURIComponent(slug)}`);
    const payload = await response.json();

    if (!response.ok || payload.status !== 'success') return null;

    return payload.data || null;
  } catch {
    return state.articles.find((item) => item.slug === slug) || null;
  }
};

const init = async () => {
  if (!app) return;

  renderLoading();

  try {
    state.articles = await fetchArticles();
    state.isLoading = false;

    const slug = getArticleSlug();
    if (slug) {
      await renderDetailPage(slug);
    } else {
      renderListPage();
    }
  } catch (error) {
    state.error = error.message;
    state.isLoading = false;
    renderError();
  }
};

init();