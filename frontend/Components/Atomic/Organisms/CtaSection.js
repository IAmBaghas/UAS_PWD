import { button } from '../Atoms/Button.js';

export const ctaSection = () => {
    return `
    <section id="pendaftaran" class="py-24 bg-[#0A1628] relative overflow-hidden scroll-mt-28">
      <div class="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop relative z-10 text-center">
        <h2 class="font-display-lg text-headline-lg md:text-display-lg text-white mb-6">Siap Memulai Perjalanan Profesional Anda?</h2>
        <p class="text-body-lg text-primary-fixed mb-10 opacity-80">Bergabunglah dengan ribuan mahasiswa lainnya dan jadilah ahli di bidang Anda. Pendaftaran mahasiswa baru tahun akademik 2026 telah dibuka.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          ${button({ label: 'Hubungi Kami', variant: 'primary', iconName: 'chat', className: 'rounded-full' })}
          ${button({ label: 'Konsultasi Program', variant: 'outlineLight', iconName: 'support_agent', className: 'rounded-full' })}
        </div>
      </div>
    </section>
  `;
};