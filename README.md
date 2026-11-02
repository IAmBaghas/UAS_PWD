# PNJ Official Portal & Admin Dashboard

> **Ujian Akhir Semester (UAS) - Pemrograman Web Dasar**

Aplikasi Web Portal Resmi **Politeknik Negeri Jakarta (PNJ)** beserta Dashboard Panel Admin terintegrasi. Proyek ini dibangun menggunakan arsitektur modern berbasis **Vanilla JavaScript** (mengikuti metodologi **Atomic Design**) pada sisi frontend, dan **Native Node.js HTTP Server** (tanpa Express/Fastify/third-party framework) pada sisi backend dengan penyimpanan berbasis file JSON (*Mimic Database*).

---

## 🚀 Fitur Utama

### 🖥️ Frontend (Public Portal)
* **Landing Page Dinamis**: Banner slider interaktif (infinite loop scroll), daftar program studi per departemen, serta artikel & berita kampus terbaru.
* **Responsive Layout**: Desain adaptif dari mobile hingga desktop menggunakan Tailwind CSS dengan skema warna Material Design modern.
* **Departemen & Program Studi**: Menampilkan visualisasi data departemen beserta daftar program studi interaktif.
* **Portal Berita & Artikel**: Halaman detail artikel lengkap dengan counter pembaca (*views counter*), kategorisasi artikel, serta tanggal publikasi terformat.
* **Atomic Design Structure**: Komponen modular terstruktur ke dalam *Atoms, Molecules, Organisms, dan Templates* agar mudah dikelola dan *reusable*.

### ⚙️ Backend (REST API Server)
* **Native HTTP Server**: Dibangun murni menggunakan modul bawaan `http` Node.js tanpa framework eksternal.
* **JSON-Based Database**: Sistem penyimpanan data lokal menggunakan file JSON (`backend/db/`) dengan operasi *asynchronous read/write* yang aman dan inisialisasi otomatis (*template fallback*).
* **Modular Router**: Pembagian penanganan request API dipecah ke dalam handler modular (`backend/route/`) dan model data (`backend/model/`).
* **Static File Serving**: Menyajikan berkas media unggahan dari direktori `backend/uploads/`.

### 🛡️ Dashboard Panel Admin
* **Autentikasi Login**: Sistem login terproteksi dengan pencocokan hash password SHA-256.
* **Manajemen Artikel & Berita**: CRUD artikel (tambah, edit, hapus) lengkap dengan dukungan unggah gambar thumbnail base64.
* **Manajemen Banner & Departemen**: Pengelolaan konten slider serta departemen kampus secara langsung.

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+), HTML5, Tailwind CSS | Modular ES Modules dengan metodologi *Atomic Design* |
| **Backend** | Native Node.js | Menggunakan modul bawaan `http`, `fs/promises`, `path`, `crypto`, `url` |
| **Database** | JSON File Storage | Penyimpanan flat-file lokal di `backend/db/` (*Zero DBMS setup*) |
| **Keamanan** | SHA-256 Hashing | Pengamanan kredensial pengguna |

---

## 📁 Struktur Direktori Proyek

```text
UAS_PWD/
├── backend/
│   ├── db/                 # Folder Penyimpanan File Database JSON
│   │   ├── article.json    # Data Artikel & Berita
│   │   ├── banner.json     # Data Banner Slide Carousel
│   │   ├── department.json # Data Departemen & Program Studi
│   │   └── users.json      # Data Pengguna & Kredensial Admin (SHA-256)
│   ├── model/              # Data Access Layer / Model Operasi CRUD
│   │   ├── article_model.js
│   │   ├── banner_model.js
│   │   ├── department_model.js
│   │   └── users_model.js
│   ├── route/              # Handler Request API per Fitur
│   │   ├── article_route.js
│   │   ├── banner_route.js
│   │   ├── department_route.js
│   │   └── users_route.js
│   ├── uploads/            # Direktori Gambar & Media Unggahan User
│   ├── db.js               # Penginisialisasi Direktori Database & Uploads
│   ├── routes.js           # Central Router / Dispatcher Utama Server
│   └── server.js           # Entry Point Aplikasi Node.js
├── frontend/
│   ├── assets/             # Aset Statis (Gambar, Logo Jurusan, dsb.)
│   ├── Components/         # Komponen Modular (Atomic Design)
│   │   ├── Admin/          # Komponen Modal & Kontrol Dashboard Admin
│   │   └── Atomic/
│   │       ├── Atoms/      # Button, Icon, SectionHeader
│   │       ├── Molecules/  # NewsCard, ProgramCard, FeatureItem, StatItem
│   │       ├── Organisms/  # Header, Hero, NewsSection, ProgramsSection, Footer
│   │       └── Templates/  # HomeTemplate
│   ├── Pages/              # Script Kontroler & Halaman Aplikasi
│   │   ├── Admin/          # Halaman Dashboard & Kelola Artikel Admin
│   │   ├── Public/         # Script Render Halaman Publik (home, contact, articles)
│   │   └── login.html      # Halaman Login Admin Portal
│   ├── articles.html       # Halaman Detail / Membaca Berita
│   ├── contact.html        # Halaman Hubungi Kami
│   └── index.html          # Entry Point Aplikasi Frontend (Home Portal)
├── package.json            # Konfigurasi Proyek & Script Runner
└── README.md               # Dokumentasi Proyek
```

---

## 🏁 Panduan Memulai (Getting Started)

### 📋 Prasyarat Sistem
* **Node.js**: Versi `16.x` atau lebih baru ([Unduh Node.js](https://nodejs.org/)).
* **Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, atau browser modern lainnya.

### ⚙️ Menjalankan Backend Server

1. **Clone repository ini** (jika belum):
   ```bash
   git clone https://github.com/IAmBaghas/UAS_PWD.git
   cd UAS_PWD
   ```

2. **Jalankan server backend**:
   ```bash
   npm start
   # atau langsung menggunakan Node.js:
   node backend/server.js
   ```

3. Server akan berjalan pada alamat:
   ```text
   http://localhost:3000
   ```
   > Direktori `backend/uploads/` dan `backend/db/` akan otomatis diinisialisasi saat server pertama kali dijalankan.

### 🌐 Membuka Frontend Portal

1. Anda dapat membuka langsung berkas `frontend/index.html` menggunakan browser pilihan Anda.
2. Untuk pengalaman terbaik (menghindari limitasi CORS pada beberapa browser saat membuka berkas lokal `file://`), disarankan menggunakan ekstensi seperti **Live Server** (VS Code) atau static HTTP server sederhana:
   ```bash
   npx serve frontend
   ```
   Lalu buka tautan yang diberikan di browser.

---

## 🔐 Kredensial Default Admin

Untuk mengakses Dashboard Admin, buka halaman login di `frontend/Pages/login.html`:

| Field | Nilai Default |
| :--- | :--- |
| **Username** | `admin` |
| **Password** | `admin` |
| **Role** | `admin` |

---

## ⚙️ Spesifikasi API Endpoints

Aplikasi backend berjalan pada port `3000` (`http://localhost:3000`) dan menyediakan endpoint REST API berikut:

### 🔑 Autentikasi & Pengguna
* `POST /api/users/login` : Autentikasi login admin/user.
* `GET /api/users` : Mendapatkan seluruh daftar pengguna (tanpa mengekspos password).
* `POST /api/users` : Menambahkan user/admin baru (password otomatis di-hash SHA-256).

### 📰 Berita & Artikel
* `GET /api/articles` : Mendapatkan daftar berita terbit.
* `GET /api/articles?id={id}` : Mendapatkan detail artikel berdasarkan ID.
* `GET /api/articles?slug={slug}` : Mendapatkan detail artikel berdasarkan URL slug ramah SEO.
* `POST /api/articles` : Membuat berita baru (termasuk upload gambar base64).
* `PUT /api/articles?id={id}` : Memperbarui artikel (mendukung penggantian gambar).
* `POST /api/articles/view?id={id}` : Menambahkan *view counter* pada artikel secara realtime.
* `DELETE /api/articles?id={id}` : Menghapus berita dan berkas thumbnail terkait di disk.

### 🖼️ Banner Carousel
* `GET /api/banners` : Mendapatkan semua slide banner aktif (urut berdasarkan `order`).
* `POST /api/banners` : Membuat slide banner baru.
* `PUT /api/banners?id={id}` : Mengubah gambar, urutan, text, atau status banner.
* `DELETE /api/banners?id={id}` : Menghapus slide banner.

### 🏫 Departemen
* `GET /api/departments` : Mendapatkan semua departemen & daftar program studi.
* `POST /api/departments` : Membuat departemen baru.
* `PUT /api/departments?id={id}` : Mengubah nama departemen & list program studi.
* `DELETE /api/departments?id={id}` : Menghapus departemen.

### 📁 Berkas Statis / Unggahan
* `GET /uploads/{filename}` : Mengakses berkas gambar yang telah diunggah ke server.

---

## 🏛️ Metodologi Atomic Design pada Frontend

Frontend dirancang secara modular menggunakan konsep **Atomic Design**:
* **Atoms (`frontend/Components/Atomic/Atoms/`)**: Elemen dasar antarmuka seperti tombol (`Button.js`), ikon (`Icon.js`), dan judul bagian (`SectionHeader.js`).
* **Molecules (`frontend/Components/Atomic/Molecules/`)**: Kombinasi atom-atom yang membentuk satu fungsi kecil, seperti kartu berita (`NewsCard.js`), kartu program studi (`ProgramCard.js`), dan item statistik (`StatItem.js`).
* **Organisms (`frontend/Components/Atomic/Organisms/`)**: Gabungan molekul yang menyusun bagian utuh halaman seperti bilah navigasi (`Header.js`), bagian hero banner (`Hero.js`), dan bagian bawah (`Footer.js`).
* **Templates (`frontend/Components/Atomic/Templates/`)**: Kerangka tata letak yang menggabungkan seluruh organisme ke dalam layout halaman (`HomeTemplate.js`).
* **Pages (`frontend/Pages/`)**: Halaman konkret yang mengikat data dari API ke dalam template.

---

## 📜 Lisensi & Catatan

* **Author**: Baghas
* **Lisensi**: ISC
* Dibuat untuk memenuhi kriteria Ujian Akhir Semester (UAS) mata kuliah **Pemrograman Web Dasar**.
