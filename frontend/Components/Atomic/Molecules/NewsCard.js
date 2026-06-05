const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

export const newsCard = ({ image, tagClass, tagLabel, date, title, description, href = '#' }) => {
  const content = `
    <article class="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden group">
      <div class="h-48 overflow-hidden">
        <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="${escapeHtml(image)}" alt="${escapeHtml(title)}"/>
      </div>
      <div class="p-card-padding">
        <div class="flex gap-2 mb-4">
          <span class="${escapeHtml(tagClass)} px-3 py-0.5 rounded-full text-label-sm font-bold">${escapeHtml(tagLabel)}</span>
          <span class="text-label-sm text-on-surface-variant">${escapeHtml(date)}</span>
        </div>
        <h4 class="font-title-lg text-title-lg text-on-background mb-3 group-hover:text-primary transition-colors">${escapeHtml(title)}</h4>
        <p class="text-body-md text-on-surface-variant">${escapeHtml(description)}</p>
      </div>
    </article>
  `;

  return `<a href="${escapeHtml(href)}" class="block h-full">${content}</a>`;
};
