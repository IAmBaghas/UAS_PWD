export const programCard = ({ iconName, category, title, description, imageSrc, imageAlt }) => {
  return `
    <div class="group bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding hover:border-primary transition-all hover:shadow-2xl">
      <div class="overflow-hidden rounded-lg mb-6 bg-surface-container-low flex items-center justify-center aspect-[4/3]">
        <img class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" src="${imageSrc}" alt="${imageAlt || title}"/>
      </div>
      <p class="text-label-sm font-bold text-on-secondary-fixed-variant uppercase mb-2">${category}</p>
      <h3 class="font-title-lg text-title-lg text-on-background mb-4">${title}</h3>
      <p class="text-body-md text-on-surface-variant mb-6">${description}</p>
      <a class="inline-flex items-center text-primary font-bold text-label-md gap-1 group/link" href="#">
        Selengkapnya
        <span class="material-symbols-outlined text-[18px] group-hover/link:ml-1 transition-all">chevron_right</span>
      </a>
    </div>
  `;
};
