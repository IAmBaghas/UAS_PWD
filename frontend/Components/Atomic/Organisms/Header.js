import { button } from '../Atoms/Button.js';
import { navLinks } from '../Molecules/NavLinks.js';

export const header = () => {
  const links = [
    { label: 'Profil', href: '#profil' },
    { label: 'Akademik', href: '#akademik' },
    { label: 'Pendaftaran', href: '#pendaftaran' },
    { label: 'Kemahasiswaan', href: '#kemahasiswaan' },
    { label: 'Kerjasama', href: '#kerjasama' },
    { label: 'Berita', href: '#berita' }
  ];

  return `
    <header id="site-header" class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
      <div class="max-w-[1440px] mx-auto flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop py-4">
        <div class="flex items-center gap-4">
          <img alt="Politeknik Negeri Jakarta Logo" class="h-12 w-auto" src="/assets/images/logo.png"/>
          <div class="hidden lg:block">
            <span class="text-title-lg font-bold text-primary block leading-tight">Politeknik Negeri Jakarta</span>
            <span class="text-label-sm text-on-surface-variant font-medium tracking-wide">Excellent in Vocational Education</span>
          </div>
        </div>
        <nav class="hidden md:flex items-center gap-6">${navLinks(links)}</nav>
        <div class="flex items-center gap-4">
          ${button({ label: 'Hubungi Kami', href: '#kontak', variant: 'primary', className: 'px-6 py-2 rounded-full' })}
          <button class="md:hidden text-primary p-2" aria-label="Open menu">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  `;
};
