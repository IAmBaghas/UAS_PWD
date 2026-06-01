export const mobileBottomNav = () => {
  const items = [
    { icon: 'home', label: 'Home', active: true, href: '#profil' },
    { icon: 'school', label: 'Academic', active: false, href: '#akademik' },
    { icon: 'assignment_ind', label: 'Admission', active: false, href: '#pendaftaran' },
    { icon: 'newspaper', label: 'News', active: false, href: '#berita' }
  ];

  return `
    <nav class="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-around items-center px-2 py-3 rounded-t-xl">
      ${items
        .map((item) => {
          const state = item.active
            ? 'bg-primary-container text-on-primary-container rounded-full'
            : 'text-on-surface-variant';
          const filled = item.active ? 1 : 0;
          return `
            <a class="flex flex-col items-center justify-center ${state} px-4 py-1 transition-all active:scale-90 duration-150" href="${item.href}">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${filled};">${item.icon}</span>
              <span class="text-label-sm mt-0.5">${item.label}</span>
            </a>
          `;
        })
        .join('')}
    </nav>
  `;
};
