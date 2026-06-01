import { icon } from './Icon.js';

const variants = {
  primary: 'bg-secondary-container text-on-secondary-container hover:opacity-90',
  ghost: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
  surface: 'bg-surface-container-high text-on-surface-variant hover:bg-outline-variant',
  outlineLight: 'bg-transparent border-2 border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-primary'
};

export const button = ({ label, variant = 'primary', href = '#', iconName = '', className = '' }) => {
  const iconMarkup = iconName ? icon(iconName, 'text-[18px]') : '';
  return `
    <a href="${href}" class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-label-md text-label-md font-bold transition-all ${variants[variant] || variants.primary} ${className}">
      <span>${label}</span>
      ${iconMarkup}
    </a>
  `;
};
