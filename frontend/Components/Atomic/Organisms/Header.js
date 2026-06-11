import { button } from '../Atoms/Button.js';
import { navLinks } from '../Molecules/NavLinks.js';

export const header = ({ linkPrefix = '', activePage = 'home' } = {}) => {
    const contactHref = './contact.html';
    const links = [
        { label: 'Profil', href: `${linkPrefix}#profil` },
        { label: 'Akademik', href: `${linkPrefix}#akademik` },
        { label: 'Kerjasama', href: `${linkPrefix}#kerjasama` },
        { label: 'Kemahasiswaan', href: `${linkPrefix}#kemahasiswaan` },
        { label: 'Berita', href: activePage === 'articles' ? './articles.html' : `${linkPrefix}#berita` },
        { label: 'Pendaftaran', href: `${linkPrefix}#pendaftaran` },
    ];

    return `
    <header id="site-header" class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
      <div class="max-w-[1440px] mx-auto flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop py-4">
        <a href="${linkPrefix || './index.html'}" class="flex items-center gap-4">
          <img alt="Politeknik Negeri Jakarta Logo" class="h-12 w-auto" src="/assets/images/logo.png"/>
          <div class="hidden lg:block">
            <span class="text-title-lg font-bold text-primary block leading-tight">Politeknik Negeri Jakarta</span>
            <span class="text-label-sm text-on-surface-variant font-medium tracking-wide">Excellent in Vocational Education</span>
          </div>
        </a>
        <nav class="hidden md:flex items-center gap-6">${navLinks(links)}</nav>
        <div class="flex items-center gap-4">
          ${button({ label: 'Hubungi Kami', href: contactHref, variant: 'primary', className: 'hidden md:inline-flex px-6 py-2 rounded-full' })}
          <button id="hamburger-btn" class="md:hidden text-primary p-2" aria-label="Open menu">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
      <!-- Mobile Menu Dropdown -->
      <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant shadow-lg flex-col px-container-margin-mobile py-6 gap-6">
        <nav class="flex flex-col gap-6 items-center">${navLinks(links)}</nav>
        <div class="flex justify-center mt-2">
          ${button({ label: 'Hubungi Kami', href: contactHref, variant: 'primary', className: 'px-8 py-3 rounded-full' })}
        </div>
      </div>
    </header>
  `;
};