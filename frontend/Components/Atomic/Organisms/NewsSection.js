import { sectionHeader } from '../Atoms/SectionHeader.js';
import { newsCard } from '../Molecules/NewsCard.js';

export const newsSection = () => {
    const items = [{
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK-oWwOhk2mvmNEeSuHjulRps-9fWHClxBX1SV2t66sYHMY4CHLgErMFkm3iK_tF8Hz1y9VRUTwO8a0ViRLnoRWfFLh9rFNAbEzRO4-pU0-c9v932b3hamUelx3sQKuEgMcGcGob-6gNLCM6ErcXrN0fJGhaJm3xSp9MCd9cTVBaPCjuXMx6L5lSKdjwv5jKLnbzrPoMIy193vSc3UpEo2bqzhmg4Eh51RXmSlC-8OJ_xBafRIf5hg6h-O0tQxE9BGaMAmXxUJIyiZ',
            tagClass: 'bg-primary/10 text-primary',
            tagLabel: 'PRESTASI',
            date: '12 Jan 2024',
            title: 'PNJ Meraih Juara Umum Kontes Robot Indonesia 2024',
            description: 'Tim robotika PNJ kembali mengharumkan nama institusi di kancah nasional dengan inovasi robot penyelamat terbaru.'
        },
        {
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfMhwNqBaIqmMzc24Nds7VRPddcTEKPyz2lVSVpmiu1y9TiDKg1cCghlINYfybe8YX7Nre1JQMp6ottEETPIddN0O5LOCPBPQapYCXmNiDCdkNTg70JRL9OcCbFTjeLxF0iAzqaOATNKjEhr88zY3fLNPZTomFwXPTwO0cgyOTX8YXRwtpNs4NfKFZsXYvX6N5hNkazk6HmUT5fu90altxInBuT_cFHea-0OEjV8DQM8g_jSBE2JZ5ZeV7wS_Xgw8wZgbeIVe6u2O5',
            tagClass: 'bg-secondary-container/20 text-secondary',
            tagLabel: 'KERJASAMA',
            date: '08 Jan 2024',
            title: 'Perkuat Vokasi, PNJ Teken MoU dengan PT Toyota Indonesia',
            description: 'Kolaborasi ini mencakup penyelarasan kurikulum otomotif dan program magang bersertifikat industri.'
        },
        {
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2U3pZXO0giD4HoiR1E02NqH9N3ULU5Y8WCWuNdntQ3Z_kaWByLd7QZfpQ-_WHQtVjZu9lR3SQ27lTmo_RCaGsjdKoLMoqucGuDJ-VVhMaHhgY5_zjyGHfo0ahRr7CWw6S_CqZgnqkMh-HN3sMsxwRfKtu9MqHU2KHjMA_JjCJV2_7sh5ev01jsmA735p9_1E20DmNLtbOBxSX-bEtxaOGhDow-xx_hf3GDuf3HtCtPL5RRhzC61CqDSoMYIWeAlsJlo4vIrwNfuD4',
            tagClass: 'bg-tertiary-container/10 text-tertiary',
            tagLabel: 'AKADEMIK',
            date: '05 Jan 2024',
            title: 'Penerimaan Mahasiswa Baru Jalur Mandiri 2026 Dibuka',
            description: 'Pendaftaran calon mahasiswa baru melalui jalur prestasi dan mandiri kini telah resmi dibuka untuk 34 program studi.'
        }
    ];

    return `
    <section id="berita" class="py-section-gap max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop scroll-mt-28">
      ${sectionHeader({ eyebrow: 'Informasi Terkini', title: 'Kabar & Prestasi Kampus' })}
      <div class="mb-8"> <a href="./articles.html" class="inline-flex bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-label-md hover:bg-outline-variant transition-colors">Semua Berita</a> </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">${items.map(newsCard).join('')}</div>
    </section>
  `;
};
