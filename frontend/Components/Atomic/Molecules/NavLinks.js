export const navLinks = (items) => {
  return items
    .map((item, index) => {
      const isActive = index === 0;
      const base = 'font-label-md text-label-md transition-colors';
      const state = isActive
        ? 'text-primary font-bold hover:text-primary-container'
        : 'text-on-surface-variant hover:text-primary';
      return `<a class="${base} ${state}" href="${item.href}">${item.label}</a>`;
    })
    .join('');
};
