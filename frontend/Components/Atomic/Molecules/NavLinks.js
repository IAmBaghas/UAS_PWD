export const navLinks = (items) => {
  return items
    .map((item, index) => {
      const base = 'nav-link font-label-md text-label-md transition-all py-1 relative border-b-2';
      const inactive = 'text-on-surface-variant border-transparent hover:text-primary hover:border-outline-variant';
      const hash = item.href.includes('#') ? item.href.split('#').pop() : '';
      const targetAttr = hash ? ` data-target="${hash}"` : '';
      return `<a class="${base} ${inactive}" href="${item.href}"${targetAttr}>${item.label}</a>`;
    })
    .join('');
};
