import { footerColumn } from '../Molecules/FooterColumn.js';

export const footer = () => {
  const institutionLinks = [
    { label: 'Tentang PNJ', href: '#' },
    { label: 'Visi & Misi', href: '#' },
    { label: 'Struktur Organisasi', href: '#' },
    { label: 'Layanan Publik', href: '#' }
  ];

  const resourceLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Campus Map', href: '#' },
    { label: 'Contact Support', href: '#' }
  ];

  return `
    <footer id="kontak" class="bg-on-background text-outline-variant py-20 pb-28 md:pb-20 scroll-mt-28">
      <div class="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <img alt="PNJ Footer Logo" class="h-12 w-auto mb-6 brightness-0 invert opacity-80" src="/assets/images/logo.png"/>
            <p class="text-label-md leading-relaxed mb-6">Pendidikan Vokasi Terkemuka di Indonesia. Menghasilkan lulusan yang kompeten, berkarakter, dan berdaya saing global.</p>
          </div>
          ${footerColumn({ title: 'Institusi', links: institutionLinks })}
          ${footerColumn({ title: 'Resources', links: resourceLinks })}
          <div>
            <h5 class="text-white font-bold mb-6">Info Terpadu</h5>
            <p class="text-label-md mb-4">Dapatkan info pendaftaran dan kegiatan kampus langsung di email Anda.</p>
            <div class="relative">
              <input class="w-full bg-surface-container-highest/10 border border-outline/30 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Email Anda" type="email"/>
              <button class="absolute right-2 top-2 bg-primary text-white p-1.5 rounded-md" aria-label="Send">
                <span class="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
        <div class="pt-8 border-t border-outline/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-label-sm">© 2024 Politeknik Negeri Jakarta. All Rights Reserved.</p>
          <div class="flex gap-6 text-label-sm">
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span> BAN-PT ACCREDITED</span>
            <span class="opacity-50">|</span>
            <span>DIKTI REGISTERED</span>
          </div>
        </div>
      </div>
    </footer>
  `;
};
