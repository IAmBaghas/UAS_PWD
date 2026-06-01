import { homeTemplate } from '../../Components/Atomic/Templates/HomeTemplate.js';

const app = document.getElementById('app');

if (app) {
  app.innerHTML = homeTemplate();

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
}
