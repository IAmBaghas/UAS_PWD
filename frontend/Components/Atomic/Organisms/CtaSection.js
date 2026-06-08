import { button } from '../Atoms/Button.js';

export const ctaSection = () => {
    return `
    <section id="pendaftaran" class="py-24 bg-[#0A1628] relative overflow-hidden scroll-mt-28">
      <div class="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop relative z-10 text-center">
        <h2 class="font-display-lg text-headline-lg md:text-display-lg text-white mb-6">Siap Memulai Perjalanan Profesional Anda?</h2>
        <p class="text-body-lg text-primary-fixed mb-6 opacity-80">Bergabunglah dengan ribuan mahasiswa lainnya dan jadilah ahli di bidang Anda. Pendaftaran mahasiswa baru tahun akademik 2026 telah dibuka.</p>
        
        <!-- Tabel Jadwal Pendaftaran -->
        <div class="overflow-x-auto my-10 max-w-2xl mx-auto bg-[#13243B] border border-primary-fixed/20 rounded-xl">
          <table class="w-full text-left border-collapse text-white">
            <thead>
              <tr class="bg-primary/25 border-b border-primary-fixed/20">
                <th class="px-6 py-4 text-label-md font-bold text-primary-fixed uppercase tracking-wider">Jalur Seleksi</th>
                <th class="px-6 py-4 text-label-md font-bold text-primary-fixed uppercase tracking-wider">Periode Pendaftaran</th>
                <th class="px-6 py-4 text-label-md font-bold text-primary-fixed uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-primary-fixed/10">
              <tr class="hover:bg-primary-fixed/5 transition-colors">
                <td class="px-6 py-4 text-body-md text-slate-200 font-semibold">SNBP (Prestasi)</td>
                <td class="px-6 py-4 text-body-md text-slate-300">Januari - Februari 2026</td>
                <td class="px-6 py-4 text-center">
                  <span class="inline-flex items-center rounded-full bg-slate-500/10 px-3 py-1 text-label-sm font-bold text-slate-400">Selesai</span>
                </td>
              </tr>
              <tr class="hover:bg-primary-fixed/5 transition-colors">
                <td class="px-6 py-4 text-body-md text-slate-200 font-semibold">UTBK - SNBT (Tes)</td>
                <td class="px-6 py-4 text-body-md text-slate-300">Maret - April 2026</td>
                <td class="px-6 py-4 text-center">
                  <span class="inline-flex items-center rounded-full bg-slate-500/10 px-3 py-1 text-label-sm font-bold text-slate-400">Selesai</span>
                </td>
              </tr>
              <tr class="hover:bg-primary-fixed/5 transition-colors">
                <td class="px-6 py-4 text-body-md text-slate-200 font-semibold">Mandiri Politeknik (PNJ)</td>
                <td class="px-6 py-4 text-body-md text-slate-300">Mei - Juli 2026</td>
                <td class="px-6 py-4 text-center">
                  <span class="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-label-sm font-bold text-emerald-400 border border-emerald-500/20">Dibuka</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          ${button({ label: 'Hubungi Kami', href: './contact.html', variant: 'primary', iconName: 'chat', className: 'rounded-full' })}
          ${button({ label: 'Konsultasi Program', variant: 'outlineLight', iconName: 'support_agent', className: 'rounded-full' })}
        </div>
      </div>
    </section>
  `;
};
