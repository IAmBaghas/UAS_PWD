export const footerColumn = ({ title, links }) => {
  return `
    <div>
      <h5 class="text-white font-bold mb-6">${title}</h5>
      <ul class="space-y-4 text-label-md">
        ${links.map((link) => `<li><a class="hover:text-primary-fixed transition-colors" href="${link.href}">${link.label}</a></li>`).join('')}
      </ul>
    </div>
  `;
};
