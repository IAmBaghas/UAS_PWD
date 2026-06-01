export const newsCard = ({ image, tagClass, tagLabel, date, title, description }) => {
  return `
    <article class="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden group">
      <div class="h-48 overflow-hidden">
        <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="${image}" alt="${title}"/>
      </div>
      <div class="p-card-padding">
        <div class="flex gap-2 mb-4">
          <span class="${tagClass} px-3 py-0.5 rounded-full text-label-sm font-bold">${tagLabel}</span>
          <span class="text-label-sm text-on-surface-variant">${date}</span>
        </div>
        <h4 class="font-title-lg text-title-lg text-on-background mb-3 group-hover:text-primary transition-colors">${title}</h4>
        <p class="text-body-md text-on-surface-variant">${description}</p>
      </div>
    </article>
  `;
};
