export const icon = (name, extraClass = '', filled = false) => {
  const fillValue = filled ? 1 : 0;
  return `<span class="material-symbols-outlined ${extraClass}" style="font-variation-settings: 'FILL' ${fillValue}, 'wght' 400, 'GRAD' 0, 'opsz' 24;">${name}</span>`;
};
