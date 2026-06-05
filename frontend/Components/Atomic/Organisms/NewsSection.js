import { sectionHeader } from '../Atoms/SectionHeader.js';

export const newsSection = () => {
  return `
    <section id="berita" class="py-section-gap max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop scroll-mt-28">
      ${sectionHeader({ eyebrow: 'Informasi Terkini', title: 'Kabar & Prestasi Kampus' })}
      <div class="mb-8"> <a href="./articles.html" class="inline-flex bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-label-md hover:bg-outline-variant transition-colors">Semua Berita</a> </div>
      <div id="news-grid" class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div class="md:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding text-on-surface-variant">
          Memuat artikel dari backend...
        </div>
      </div>
    </section>
  `;
};
