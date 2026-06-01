import { featureItem } from '../Molecules/FeatureItem.js';

export const whyChooseSection = () => {
  const features = [
    {
      iconName: 'eco',
      title: 'Green Campus',
      description: 'Lingkungan kampus yang asri, berkelanjutan, dan mendukung konsentrasi belajar maksimal di tengah kota.'
    },
    {
      iconName: 'handshake',
      title: 'Industrial Partnership',
      description: 'Kerjasama strategis dengan lebih dari 150 perusahaan multinasional untuk jaminan magang dan penyerapan lulusan.'
    },
    {
      iconName: 'psychology_alt',
      title: 'Applied Expertise',
      description: 'Kurikulum vokasi 70% praktikum untuk memastikan Anda siap kerja sejak hari pertama setelah lulus.'
    }
  ];

  return `
    <section id="kerjasama" class="py-section-gap bg-surface-container-low overflow-hidden scroll-mt-28">
      <div id="kemahasiswaan" class="scroll-mt-28"></div>
      <div class="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center">
        <div class="relative">
          <div class="absolute -top-4 -left-4 w-24 h-24 bg-secondary-container rounded-full opacity-20 animate-pulse"></div>
          <img class="rounded-3xl shadow-2xl relative z-10 w-full h-[400px] object-cover" alt="Laboratorium PNJ" src="/assets/images/put.png"/>
          <div class="absolute -bottom-8 -right-8 glass-card border border-outline-variant p-6 rounded-2xl shadow-lg z-20 max-w-[200px]">
            <p class="text-headline-md font-bold text-primary mb-1">92%</p>
            <p class="text-label-sm text-on-surface-variant">Lulusan langsung bekerja dalam 6 bulan</p>
          </div>
        </div>
        <div>
          <h2 class="font-headline-lg text-headline-lg text-on-background mb-8">Kenapa Memilih PNJ?</h2>
          <div class="space-y-8">${features.map(featureItem).join('')}</div>
        </div>
      </div>
    </section>
  `;
};
