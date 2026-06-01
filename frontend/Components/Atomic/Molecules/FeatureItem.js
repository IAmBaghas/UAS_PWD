export const featureItem = ({ iconName, title, description }) => {
  return `
    <div class="flex gap-6 group">
      <div class="flex-shrink-0 w-14 h-14 bg-white border border-outline-variant rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">${iconName}</span>
      </div>
      <div>
        <h4 class="font-title-lg text-title-lg text-on-background mb-2">${title}</h4>
        <p class="text-body-md text-on-surface-variant">${description}</p>
      </div>
    </div>
  `;
};
