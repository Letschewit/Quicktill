# 📖 Quicktill POS

**Quicktill** adalah aplikasi **Point of Sales (POS)** berbasis web yang dikembangkan untuk membantu usaha kecil maupun menengah dalam mengelola transaksi, stok barang, pengguna, serta laporan penjualan. Proyek ini terbagi menjadi dua bagian utama:

* **Frontend** → modul antarmuka pengguna (kasir, admin).
* **Backend** → modul server & logika bisnis (API, database, autentikasi).

---

## 🚀 Fitur Utama

* **Transaksi Cepat**: pencatatan penjualan secara real-time.
* **Manajemen Produk & Stok**: CRUD barang dan monitoring ketersediaan.
* **Manajemen Pengguna**: pengaturan peran admin & kasir.
* **Laporan Penjualan**: ringkasan transaksi untuk analisis usaha.
* **Desain Responsif**: dapat digunakan di PC, tablet, maupun perangkat mobile.

---

## ⚙️ Dependencies Developer

Agar aplikasi dapat dijalankan, developer perlu menyiapkan environment dengan dependencies berikut:

### 1. **Backend** (📂 `htdocs/quicktill-backend`)

* **PHP ≥ 8.0** (disarankan PHP 8.1 atau lebih baru).
* **Composer** (manajemen dependency PHP).
* **Web Server**: Apache / Nginx.
* **Database**: MySQL / MariaDB (≥ 5.7).
* **Ekstensi PHP**:

  * `pdo_mysql`
  * `mbstring`
  * `openssl`
  * `tokenizer`
  * `xml`

**Package Laravel (umum digunakan):**

* `laravel/framework` (≥ 9.x)
* `fruitcake/laravel-cors`
* `guzzlehttp/guzzle`
* `laravel/sanctum` atau `laravel/passport` (untuk autentikasi API)

### 2. **Frontend** (📂 `quicktill-frontend`)

* **Node.js ≥ 16**
* **npm / yarn**
* Dependencies umum (tergantung setup proyek, contoh):

  * `axios` (HTTP client untuk komunikasi dengan backend).
  * `vue` / `react` (jika menggunakan framework tertentu).
  * `bootstrap` atau `tailwindcss` (untuk styling).

### 3. **Tools Pendukung**

* **Git** (version control).
* **Postman / Insomnia** (opsional, testing API).
* **VS Code / PhpStorm** (IDE/Editor dengan dukungan Laravel & JavaScript).

---

## 🛠️ Setup & Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/Letschewit/Quicktill.git
cd Quicktill
```

### 2. Backend Setup

```bash
cd htdocs/quicktill-backend
composer install
cp .env.example .env
php artisan key:generate
```

* Edit file `.env` dan sesuaikan konfigurasi database.
* Jalankan migrasi database:

```bash
php artisan migrate
```

* Jalankan server:

```bash
php artisan serve
```

### 3. Frontend Setup

```bash
cd quicktill-frontend
npm install
npm start
```

---

## 📂 Struktur Proyek

```
Quicktill/
│── .vscode/                 # Config editor
│── htdocs/
│   └── quicktill-backend/   # Backend (Laravel/PHP)
│── quicktill-frontend/      # Frontend (JS, CSS, HTML)
│── README.md                # Dokumentasi utama
```

---

## 🔗 Integrasi Frontend & Backend

* Frontend akan memanggil API endpoint dari backend (misalnya `http://localhost:8000/api/...`).
* Pastikan konfigurasi **CORS** sudah diaktifkan di backend agar frontend dapat mengakses API.
* Untuk deployment, frontend dapat dibuild menjadi static files lalu diintegrasikan ke hosting yang sama dengan backend, atau dijalankan terpisah.

---

## 🧪 Testing

* Jalankan unit test backend dengan:

```bash
php artisan test
```

* Testing API dapat dilakukan dengan Postman/Insomnia.
* Jika ada test frontend (mis. Jest/Vitest), jalankan dengan:

```bash
npm run test
```

---

## 👥 Kontribusi

Kontribusi terbuka untuk perbaikan bug, penambahan fitur, atau dokumentasi. Silakan fork repository, buat branch baru, dan ajukan pull request.

---
