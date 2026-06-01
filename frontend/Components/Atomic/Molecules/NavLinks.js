export const navLinks = (items) => {
  return items
    .map((item, index) => {
      const base = 'nav-link font-label-md text-label-md transition-all py-1 relative border-b-2';
      const inactive = 'text-on-surface-variant border-transparent hover:text-primary hover:border-outline-variant';
      return `<a class="${base} ${inactive}" href="${item.href}" data-target="${item.href.substring(1)}">${item.label}</a>`;
    })
    .join('');
};
