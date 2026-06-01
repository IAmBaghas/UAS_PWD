import { button } from '../Atoms/Button.js';

export const hero = () => {
  return `
    <section id="profil" class="relative h-[600px] flex items-center overflow-hidden scroll-mt-28">
      <div class="absolute inset-0 z-0">
        <img class="w-full h-full object-cover" alt="Kampus PNJ" src="/assets/images/put.png"/>
        <div class="absolute inset-0 hero-gradient"></div>
      </div>
      <div class="relative z-10 max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop w-full">
        <div class="max-w-2xl text-white">
          <div class="inline-flex items-center gap-2 bg-secondary-container/20 border border-secondary-container/30 rounded-full px-4 py-1 mb-6">
            <span class="material-symbols-outlined text-secondary-fixed text-[18px]" style="font-variation-settings: 'FILL' 1;">stars</span>
            <span class="text-label-sm font-bold text-secondary-fixed uppercase tracking-widest">Akreditasi Unggul</span>
          </div>
          <h1 class="font-display-lg text-headline-lg-mobile md:text-display-lg mb-6 leading-[1.1]">Membangun Masa Depan <br/>Melalui Keahlian Terapan</h1>
          <p class="text-body-lg text-surface-variant mb-8 opacity-90 max-w-lg">Persiapkan karir profesional Anda bersama Politeknik Negeri Jakarta. Pendidikan vokasi berkualitas dengan fasilitas standar industri dan kurikulum masa depan.</p>
          <div class="flex flex-wrap gap-4">
            ${button({ label: 'Daftar Sekarang', variant: 'primary', iconName: 'arrow_forward' })}
            ${button({ label: 'Lihat Program Studi', variant: 'ghost' })}
          </div>
        </div>
      </div>
    </section>
  `;
};
