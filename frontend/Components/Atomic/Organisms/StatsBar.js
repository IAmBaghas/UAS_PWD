import { statItem } from '../Molecules/StatItem.js';

export const statsBar = () => {
  const stats = [
    { value: '34', suffix: '+', label: 'Program Studi' },
    { value: '20', suffix: 'k+', label: 'Alumni Tersebar' },
    { value: '50', suffix: '+', label: 'Mitra Industri' },
    { value: '300', suffix: '+', label: 'Dosen Ahli' }
  ];

  return `
    <section class="relative z-20 -mt-16 max-w-[1200px] mx-auto px-4">
      <div class="bg-surface-container-lowest shadow-xl border border-outline-variant rounded-2xl p-base md:p-card-padding grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-outline-variant">
        ${stats.map(statItem).join('')}
      </div>
    </section>
  `;
};
