import { sectionHeader } from '../Atoms/SectionHeader.js';
import { programCard } from '../Molecules/ProgramCard.js';

export const programsSection = () => {
  const programs = [
    {
      iconName: 'engineering',
      category: 'Engineering',
      title: 'Teknik Mesin',
      description: 'Mempelajari manufaktur, perpindahan panas, mesin produksi, dan praktik bengkel untuk kebutuhan industri modern.',
      imageSrc: '/assets/images/jurusan/Teknik%20Mesin.png',
      imageAlt: 'Banner Teknik Mesin'
    },
    {
      iconName: 'apartment',
      category: 'Construction',
      title: 'Teknik Sipil',
      description: 'Fokus pada struktur bangunan, jalan, jembatan, hidrologi, dan pengelolaan proyek konstruksi.',
      imageSrc: '/assets/images/jurusan/Teknik%20Sipil.png',
      imageAlt: 'Banner Teknik Sipil'
    },
    {
      iconName: 'terminal',
      category: 'Technology',
      title: 'Teknik Informatika',
      description: 'Mencakup pengembangan perangkat lunak, basis data, jaringan, cloud, dan keamanan sistem informasi.',
      imageSrc: '/assets/images/jurusan/Teknik%20Informatika.png',
      imageAlt: 'Banner Teknik Informatika'
    },
    {
      iconName: 'bolt',
      category: 'Engineering',
      title: 'Teknik Elektro',
      description: 'Berfokus pada elektronika, kontrol, instrumentasi, dan sistem tenaga listrik yang diterapkan di industri.',
      imageSrc: '/assets/images/jurusan/Teknik%20Elektro.jpg',
      imageAlt: 'Banner Teknik Elektro'
    },
    {
      iconName: 'print',
      category: 'Media',
      title: 'Teknik Grafika dan Penerbitan (TGP)',
      description: 'Mempelajari desain grafis, produksi cetak, prepress, dan proses penerbitan untuk media cetak maupun digital.',
      imageSrc: '/assets/images/jurusan/Teknik%20Grafika%20Penerbitan.jpg',
      imageAlt: 'Banner Teknik Grafika dan Penerbitan'
    },
    {
      iconName: 'business_center',
      category: 'Management',
      title: 'Administrasi Niaga',
      description: 'Membekali mahasiswa dengan kompetensi administrasi, pemasaran, akuntansi dasar, dan pengelolaan bisnis.',
      imageSrc: '/assets/images/jurusan/Administrasi%20Niaga.jpg',
      imageAlt: 'Banner Administrasi Niaga'
    },
    {
      iconName: 'account_balance',
      category: 'Finance',
      title: 'Akuntansi',
      description: 'Fokus pada akuntansi keuangan, manajerial, perpajakan, dan audit untuk mencetak profesional di bidang finansial.',
      imageSrc: '/assets/images/jurusan/Akuntansi.jpg',
      imageAlt: 'Banner Akuntansi'
    }
  ];

  return `
    <section id="akademik" class="py-section-gap max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop scroll-mt-28">
      ${sectionHeader({ eyebrow: 'Akademik', title: 'Program Unggulan', actionLabel: 'Lihat Semua Jurusan' })}
      <div id="programs-carousel" class="flex gap-gutter overflow-x-auto snap-x snap-mandatory pb-8" style="scrollbar-width: none;">
        ${programs.map(programCard).join('')}
      </div>
      <div id="carousel-indicators" class="flex justify-center gap-2 mt-2">
        ${programs.map((_, i) => `<button aria-label="Go to slide ${i + 1}" class="transition-all rounded-full ${i === 0 ? 'bg-primary w-6 h-2.5' : 'bg-outline-variant w-2.5 h-2.5'}"></button>`).join('')}
      </div>
    </section>
  `;
};
