# PNJ Official Portal & Admin Dashboard
> **Ujian Akhir Semester (UAS) - Pemrograman Web Dasar**

Aplikasi Web Portal Resmi **Politeknik Negeri Jakarta (PNJ)** beserta Dashboard Panel Admin terintegrasi. Proyek ini dibangun menggunakan arsitektur modern berbasis **Vanilla JavaScript** (mengikuti metodologi **Atomic Design**) pada sisi frontend, dan **Native Node.js HTTP Server** (tanpa Express/Fastify) pada sisi backend dengan penyimpanan berbasis file JSON (Mimic Database).

---

## 🚀 Fitur Utama

### 🖥️ Frontend (Public Portal)
* **Landing Page Dinamis**: Banner slider berulang (infinite loop scroll), list program studi, serta daftar artikel berita terbaru.
* **Responsive Layout**: Desain adaptif dari mobile hingga desktop menggunakan Tailwind CSS dengan skema warna Material Design modern.
* **Departemen & Program Studi**: Menampilkan visualisasi data departemen berserta daftar program studi secara interaktif.
* **Portal Berita & Artikel**: Halaman baca artikel lengkap dengan counter pembaca (views), pembagian kategori, serta tanggal publikasi terformat.
* **Atomic Design Structure**: Kode komponen dipisahkan ke dalam *Atoms, Molecules, Organisms, dan Templates* agar reusable dan teratur.

### ⚙️ Backend (REST API Server)
* **Native HTTP Server**: Dibangun murni menggunakan modul bawaan `http` Node.js tanpa framework pihak ketiga.
* **JSON-Based Database**: Sistem basis data lokal menggunakan file JSON (`backend/db/`) dengan penanganan asynchronous read/write data yang aman.
* **Autentikasi Aman**: Pencocokan kredensial login admin menggunakan enkripsi searah **SHA-256** melalui modul bawaan `crypto`.
* **Modul Berkas Dinamis**: Mengunggah thumbnail artikel, gambar banner, dan logo departemen dengan metode enkripsi Base64 string.
* **Modular Router**: Pembagian penanganan request API dipecah ke dalam folder `backend/route/` dan model data pada `backend/model/`.

---

## 📁 Struktur Direktori Proyek

```text
UAS_PWD/
├── backend/
│   ├── db/                 # Folder Penyimpanan File Database JSON
│   │   ├── article.json    # Data Artikel & Berita
│   │   ├── banner.json     # Data Banner Slide Carousel
│   │   ├── department.json # Data Departemen & Program Studi
│   │   └── users.json      # Data Pengguna & Kredensial Admin (Terarsip SHA-256)
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
│   ├── uploads/            # Direktori Gambar Unggahan User
│   ├── db.js               # Penginisialisasi Direktori Database & Uploads
│   ├── routes.js           # Central Router / Dispatcher Utama Server
│   └── server.js           # Entry Point Aplikasi Node.js
├── frontend/
│   ├── assets/             # Aset Statis (Gambar, Logo, CSS Kustom)
│   ├── Components/         # Komponen Modular (Atomic Design)
│   │   ├── Admin/          # Komponen Khusus Dashboard Admin
│   │   └── Atomic/         # Pembagian Struktur Atoms, Molecules, Organisms, dll.
│   ├── Pages/              # Kontroler Halaman Utama
│   │   ├── Admin/          # Halaman Dashboard & Kelola Artikel Admin
│   │   ├── Public/         # Script Render Halaman Publik (home, contact, articles)
│   │   └── login.html      # Halaman Login Admin Portal
│   ├── articles.html       # Halaman Detail/Membaca Berita
│   ├── contact.html        # Halaman Hubungi Kami
│   └── index.html          # Entry Point Aplikasi Frontend (Home)
├── package.json            # Konfigurasi Proyek & Runner Script
└── README.md               # Dokumentasi Proyek
```

---

## ⚙️ Spesifikasi API Endpoints

Aplikasi backend berjalan pada port `3000` (`http://localhost:3000`) dengan menjalankan `node server.js` pada direktori `backend` dan menyediakan endpoint-endpoint berikut:

### 🔑 Autentikasi & Pengguna
* `POST /api/users/login` : Autentikasi login admin/user.
* `GET /api/users` : Mendapatkan seluruh daftar pengguna (tanpa mengekspos password).
* `POST /api/users` : Menambahkan user/admin baru (password otomatis di-hash SHA-256).

### 📰 Berita & Artikel
* `GET /api/articles` : Mendapatkan daftar berita terbit.
* `GET /api/articles?id={id}` : Mendapatkan detail artikel berdasarkan ID.
* `GET /api/articles?slug={slug}` : Mendapatkan detail artikel berdasarkan URL slug ramah SEO.
* `POST /api/articles` : Membuat berita baru (termasuk upload gambar base64).
* `PUT /api/articles?id={id}` : Memperbarui artikel (mendukung penggantian gambar lama).
* `POST /api/articles/view?id={id}` : Menambahkan view counter pada artikel secara realtime.
* `DELETE /api/articles?id={id}` : Menghapus berita dan menghapus thumbnail berkas di disk.

### 🖼️ Banner Carousel
* `GET /api/banners` : Mendapatkan semua gambar slide banner yang aktif (urut berdasarkan `order`).
* `POST /api/banners` : Membuat slide banner baru.
* `PUT /api/banners?id={id}` : Mengubah gambar, urutan, text, atau status banner.
* `DELETE /api/banners?id={id}` : Menghapus banner.

### 🏫 Departemen
* `GET /api/departments` : Mendapatkan semua departemen & daftar program studi.
* `POST /api/departments` : Membuat departemen baru.
* `PUT /api/departments?id={id}` : Mengubah nama departemen & list program studi.
* `DELETE /api/departments?id={id}` : Menghapus departemen.

---
*Dibuat untuk memenuhi kriteria Ujian Akhir Semester (UAS) mata kuliah Pemrograman Web Dasar.*
