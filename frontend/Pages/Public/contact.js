import { header } from '../../Components/Atomic/Organisms/Header.js';
import { footer } from '../../Components/Atomic/Organisms/Footer.js';

const app = document.getElementById('app');

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const renderContactPage = () => {
  app.innerHTML = `
    ${header({ linkPrefix: './index.html', activePage: 'contact' })}
    <main class="min-h-screen">
      <section class="bg-surface-container-low border-b border-outline-variant">
        <div class="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-14 md:py-16">
          <a href="./index.html" class="inline-flex items-center gap-2 text-primary font-label-md mb-8">
            <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            Kembali ke beranda
          </a>
          <div class="max-w-4xl">
            <p class="text-label-sm font-bold text-primary uppercase mb-3">Layanan Akademik</p>
            <h1 class="font-display-lg text-[36px] md:text-display-lg leading-tight mb-4">Hubungi Kami</h1>
            <p class="text-body-lg text-on-surface-variant">Sampaikan pertanyaan resmi terkait pendaftaran, informasi akademik, kerja sama, atau layanan kampus Politeknik Negeri Jakarta.</p>
          </div>
        </div>
      </section>

      <section class="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-gutter items-start">
          <section class="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding">
            <div id="contact-alert" class="hidden mb-6 rounded-lg border px-4 py-3 text-body-md"></div>
            <form id="contact-form" class="grid grid-cols-1 md:grid-cols-2 gap-5" novalidate>
              <div class="md:col-span-2">
                <label class="block text-label-md font-bold text-on-surface mb-2" for="fullName">Nama Lengkap</label>
                <input id="fullName" name="fullName" type="text" autocomplete="name" required
                  class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-4 py-3 focus:border-primary focus:ring-primary"
                  placeholder="Masukkan nama lengkap" />
                <p class="field-error mt-2 hidden text-label-sm text-error" data-error-for="fullName"></p>
              </div>

              <div>
                <label class="block text-label-md font-bold text-on-surface mb-2" for="email">Email</label>
                <input id="email" name="email" type="email" autocomplete="email" required
                  class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-4 py-3 focus:border-primary focus:ring-primary"
                  placeholder="nama@email.com" />
                <p class="field-error mt-2 hidden text-label-sm text-error" data-error-for="email"></p>
              </div>

              <div>
                <label class="block text-label-md font-bold text-on-surface mb-2" for="phone">Nomor Telepon</label>
                <input id="phone" name="phone" type="tel" autocomplete="tel" required
                  class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-4 py-3 focus:border-primary focus:ring-primary"
                  placeholder="08xxxxxxxxxx" />
                <p class="field-error mt-2 hidden text-label-sm text-error" data-error-for="phone"></p>
              </div>

              <div>
                <label class="block text-label-md font-bold text-on-surface mb-2" for="service">Tujuan Layanan</label>
                <select id="service" name="service" required
                  class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-4 py-3 focus:border-primary focus:ring-primary">
                  <option value="">Pilih layanan</option>
                  <option>Informasi Pendaftaran</option>
                  <option>Layanan Akademik</option>
                  <option>Kerja Sama Institusi</option>
                  <option>Informasi Program Studi</option>
                  <option>Layanan Umum</option>
                </select>
                <p class="field-error mt-2 hidden text-label-sm text-error" data-error-for="service"></p>
              </div>

              <div>
                <label class="block text-label-md font-bold text-on-surface mb-2" for="identity">Status Pengirim</label>
                <select id="identity" name="identity" required
                  class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-4 py-3 focus:border-primary focus:ring-primary">
                  <option value="">Pilih status</option>
                  <option>Calon Mahasiswa</option>
                  <option>Mahasiswa</option>
                  <option>Orang Tua/Wali</option>
                  <option>Alumni</option>
                  <option>Mitra Institusi</option>
                  <option>Masyarakat Umum</option>
                </select>
                <p class="field-error mt-2 hidden text-label-sm text-error" data-error-for="identity"></p>
              </div>

              <div class="md:col-span-2">
                <label class="block text-label-md font-bold text-on-surface mb-2" for="subject">Subjek</label>
                <input id="subject" name="subject" type="text" required
                  class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-4 py-3 focus:border-primary focus:ring-primary"
                  placeholder="Tuliskan subjek pesan" />
                <p class="field-error mt-2 hidden text-label-sm text-error" data-error-for="subject"></p>
              </div>

              <div class="md:col-span-2">
                <label class="block text-label-md font-bold text-on-surface mb-2" for="message">Pesan</label>
                <textarea id="message" name="message" rows="6" required
                  class="w-full resize-y rounded-lg border-outline-variant bg-surface-container-lowest px-4 py-3 focus:border-primary focus:ring-primary"
                  placeholder="Jelaskan kebutuhan atau pertanyaan Anda secara lengkap"></textarea>
                <p class="field-error mt-2 hidden text-label-sm text-error" data-error-for="message"></p>
              </div>

              <div class="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                <p class="text-label-sm text-on-surface-variant">Tim akademik akan menindaklanjuti pesan sesuai urutan penerimaan.</p>
                <button type="submit" class="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-container px-7 py-3 font-label-md text-label-md font-bold text-on-secondary-container transition-opacity hover:opacity-90">
                  Kirim Pesan
                  <span class="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </form>
          </section>

          <aside class="space-y-4">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding">
              <h2 class="font-title-lg text-title-lg mb-4">Kontak Akademik</h2>
              <div class="space-y-4 text-body-md text-on-surface-variant">
                <p class="flex gap-3"><span class="material-symbols-outlined text-primary">location_on</span><span>Jl. Prof. DR. G.A. Siwabessy, Kampus UI Depok, Jawa Barat</span></p>
                <p class="flex gap-3"><span class="material-symbols-outlined text-primary">call</span><span>(021) 7270036</span></p>
                <p class="flex gap-3"><span class="material-symbols-outlined text-primary">mail</span><span>humas@pnj.ac.id</span></p>
              </div>
            </div>

            <div class="bg-primary text-on-primary rounded-xl p-card-padding">
              <h2 class="font-title-lg text-title-lg mb-3">Jam Layanan</h2>
              <p class="text-body-md opacity-90">Senin sampai Jumat, pukul 08.00 sampai 16.00 WIB.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
    ${footer()}
  `;
};

const setFieldError = (fieldName, message = '') => {
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  const field = document.querySelector(`[name="${fieldName}"]`);
  if (!error || !field) return;

  error.textContent = message;
  error.classList.toggle('hidden', !message);
  field.classList.toggle('border-error', Boolean(message));
};

const showAlert = (type, message) => {
  const alert = document.getElementById('contact-alert');
  if (!alert) return;

  const isSuccess = type === 'success';
  alert.className = `mb-6 rounded-lg border px-4 py-3 text-body-md ${isSuccess ? 'border-primary/30 bg-primary/10 text-primary' : 'border-error/30 bg-red-50 text-error'}`;
  alert.textContent = message;
};

const validateForm = (form) => {
  const data = Object.fromEntries(new FormData(form).entries());
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.fullName?.trim()) errors.fullName = 'Nama lengkap wajib diisi.';
  if (!data.email?.trim()) errors.email = 'Email wajib diisi.';
  else if (!emailPattern.test(data.email)) errors.email = 'Format email belum valid.';
  if (!data.phone?.trim()) errors.phone = 'Nomor telepon wajib diisi.';
  if (!data.service) errors.service = 'Tujuan layanan wajib dipilih.';
  if (!data.identity) errors.identity = 'Status pengirim wajib dipilih.';
  if (!data.subject?.trim()) errors.subject = 'Subjek wajib diisi.';
  if (!data.message?.trim()) errors.message = 'Pesan wajib diisi.';
  else if (data.message.trim().length < 10) errors.message = 'Pesan minimal 10 karakter.';

  ['fullName', 'email', 'phone', 'service', 'identity', 'subject', 'message'].forEach((field) => {
    setFieldError(field, errors[field] || '');
  });

  return { isValid: Object.keys(errors).length === 0, data };
};

const bindContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { isValid, data } = validateForm(form);

    if (!isValid) {
      showAlert('error', 'Mohon lengkapi data yang diperlukan sebelum mengirim pesan.');
      return;
    }

    const submissions = JSON.parse(localStorage.getItem('pnjContactSubmissions') || '[]');
    submissions.push({
      ...data,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('pnjContactSubmissions', JSON.stringify(submissions));

    form.reset();
    showAlert('success', 'Pesan berhasil dikirim.');
  });
};

const bindMobileMenu = () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburgerBtn || !mobileMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
};

if (app) {
  renderContactPage();
  bindMobileMenu();
  bindContactForm();
}
