export const statItem = ({ value, suffix = '', label }) => {
  return `
    <div class="text-center px-4">
      <p class="font-headline-lg text-headline-lg text-primary">${value}<span class="text-secondary-fixed-dim">${suffix}</span></p>
      <p class="text-label-md text-on-surface-variant font-medium">${label}</p>
    </div>
  `;
};
