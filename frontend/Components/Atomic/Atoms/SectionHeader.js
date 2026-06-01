export const sectionHeader = ({ eyebrow = '', title = '', actionLabel = '', actionHref = '#' }) => {
  const action = actionLabel
    ? `<a class="text-primary font-label-md flex items-center gap-2 group" href="${actionHref}">${actionLabel}<span class="material-symbols-outlined transition-transform group-hover:translate-x-1">east</span></a>`
    : '';

  return `
    <div class="flex justify-between items-end gap-4 mb-12">
      <div>
        <p class="text-label-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">${eyebrow}</p>
        <h2 class="font-headline-lg text-headline-lg text-on-background">${title}</h2>
      </div>
      ${action}
    </div>
  `;
};
