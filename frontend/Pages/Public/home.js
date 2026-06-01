import { homeTemplate } from '../../Components/Atomic/Templates/HomeTemplate.js';

const app = document.getElementById('app');

if (app) {
  app.innerHTML = homeTemplate();

  window.addEventListener('scroll', () => {
    const header = document.getElementById('site-header');
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
  });
}
