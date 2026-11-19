# DAFTAR TUGAS & MILESTONE IMPLEMENTASI (TASKS.MD)
## Proyek: Cau Chocolates Bali — Katalog Digital & Dashboard Demo Agrowisata Kakao

---

### Dokumen Kontrol
- **Nama Sistem**: Cau Chocolates Catalog (`Cau Chocolates Factory & Restaurant, Bali`)
- **Referensi Utama**: `SPEC.md` & `UI-SPEC.md`
- **Arsitektur**: Single-Page Web Application (SPA) Client-side Only (Vite + Vanilla JS ES Modules, HTML5, CSS3)
- **Status Dokumen**: Perencanaan Tugas (Tahap Pra-Implementasi — Tanpa Perubahan Kode)

---

## RINGKASAN MILESTONE

| Kode | Nama Milestone | Fokus Utama |
| :--- | :--- | :--- |
| **M-01** | **Scaffold & Arsitektur Proyek** | Inisialisasi Vite, struktur folder modular, dan token desain CSS (`UI-SPEC.md`). |
| **M-02** | **Katalog & Tampilan Storefront** | Navbar, Hero Banner, Grid Produk, Kartu Produk, dan fallback gambar SVG. |
| **M-03** | **Interaksi Pencarian, Filter & Sorting** | Pencarian real-time, filter 4 kategori, dan pengurutan dinamis tanpa reload. |
| **M-04** | **Integrasi Pemesanan WhatsApp** | Generator URL `wa.me` terenkripsi dan logika tombol `disabled` saat stok `0`. |
| **M-05** | **CRUD Dashboard Pengelola** | Mode switcher, KPI cards, tabel/kartu inventaris, serta form Create/Update/Delete. |
| **M-06** | **Persistensi `localStorage` & Reset** | Penyimpanan data persisten, fail-safe JSON parser, dan fitur Reset ke Data Awal. |
| **M-07** | **Testing & Verifikasi Kriteria (QA)** | Pengujian manual menyeluruh sesuai Acceptance Criteria (`AC-01` s.d. `AC-13`). |
| **M-08** | **Security Hardening & Aksesibilitas** | Pencegahan XSS (`textContent`), validasi input ketat, kontras WCAG AA/AAA, & touch target. |
| **M-09** | **Build & Optimasi Produksi** | Kompilasi aset produksi Vite, pengecekan bundel, dan preview build lokal. |
| **M-10** | **Deployment & Panduan Rilis** | Konfigurasi hosting statis, dokumentasi `README.md`, dan verifikasi pasca-rilis. |

---

## RINCIAN TUGAS PER MILESTONE

---

### MILESTONE 1: SCAFFOLD & ARSITEKTUR PROYEK

#### `TASK-01.1`: Inisialisasi Proyek Vite & Struktur Direktori Modular
- **Deskripsi**: Menyiapkan proyek web modern berbasis Vite (Vanilla JS) dengan struktur folder terpisah untuk data, layanan penyimpanan, utilitas, dan komponen tampilan sesuai `SPEC.md`.
- **Berkas yang Mungkin Berubah**:
  - `package.json`
  - `vite.config.js`
  - `index.html`
  - `src/main.js`
- **Acceptance Criteria**:
  1. Proyek dapat dijalankan secara lokal menggunakan perintah `npm run dev` tanpa error.
  2. `index.html` memuat metadata lengkap bertema *Cau Chocolates Bali (Cau Chocolates Factory & Restaurant, Tabanan, Bali)* serta memuat font Google Fonts (`Plus Jakarta Sans` / `Inter`).
  3. Tidak ada dependensi framework eksternal berat (React/Vue/Angular) ataupun pustaka backend di `package.json`.

#### `TASK-01.2`: Implementasi Design Tokens & Base CSS Mobile-First
- **Deskripsi**: Menerjemahkan palet warna krem hangat (`#FAF7F2`) dan hijau rempah (`#234F32`), skala tipografi sans-serif, serta aturan layout responsif mobile-first dari `UI-SPEC.md` ke dalam sistem stylesheet CSS.
- **Berkas yang Mungkin Berubah**:
  - `src/styles/tokens.css`
  - `src/styles/main.css`
- **Acceptance Criteria**:
  1. Semua variabel warna semantik (`--bg-cream-base`, `--brand-spice-green`, `--action-wa-green`, `--accent-turmeric-gold`, dll.) terdefinisi di `:root`.
  2. Tata letak dasar mendukung lebar layar mulai dari `360px` (mobile), `768px` (tablet), hingga `1280px+` (desktop) tanpa *horizontal overflow*.
  3. Seluruh elemen interaktif memiliki aturan `min-height: 44px` dan indikator `:focus-visible` berwarna emas rempah (`#B4691E`).

#### `TASK-01.3`: Pembuatan Seed Data 8 Produk Cau Chocolates Bali & Utilitas Formatter
- **Deskripsi**: Menyusun array data awal berisi 8 produk tematik Cau Chocolates Bali (dengan produk ke-6 `cau-prod-006` memiliki `stok: 0`) serta fungsi pemformat mata uang Rupiah.
- **Berkas yang Mungkin Berubah**:
  - `src/data/initialProducts.js`
  - `src/utils/formatters.js`
- **Acceptance Criteria**:
  1. `initialProducts.js` mengekspor tepat 8 objek produk valid sesuai skema `Product` pada `SPEC.md` Bab 4.3.
  2. Minimal terdapat 1 produk dengan `stok: 0` (`Organic Raw Cocoa Nibs 200g`) dan 3 produk dengan `unggulan: true`.
  3. Helper `formatRupiah()` menghasilkan format standar Indonesia (contoh: `Rp 45.000`) menggunakan `Intl.NumberFormat('id-ID')` dengan `tabular-nums`.

---

### MILESTONE 2: KATALOG & TAMPILAN STOREFRONT

#### `TASK-02.1`: Komponen Top Navbar & Mode Switcher
- **Deskripsi**: Membangun navigasi atas lengket (`sticky`) yang menampilkan identitas gerai Cau Chocolates Bali dan tombol perpindahan tampilan antara *Katalog* dan *Dashboard Demo* tanpa login.
- **Berkas yang Mungkin Berubah**:
  - `index.html`
  - `src/components/navbar.js`
  - `src/styles/main.css`
- **Acceptance Criteria**:
  1. Navbar menampilkan nama toko **"Cau Chocolates Bali"** dan keterangan lokasi Tabanan, Bali.
  2. Tersedia dua tombol tab navigasi (`Katalog` dan `Dashboard Demo`) yang responsif pada layar mobile `360px` maupun desktop `1280px`.
  3. Tab yang aktif menampilkan gaya visual hijau rempah (`#234F32`) dan atribut `aria-pressed="true"` atau `aria-current="page"`.

#### `TASK-02.2`: Komponen Hero Banner Agrowisata Kakao
- **Deskripsi**: Membuat bagian Hero Banner berlatar hijau rempah dengan ajakan eksplorasi produk lokal serta dua tombol aksi cepat (*Lihat Katalog* dan *Kelola Stok*).
- **Berkas yang Mungkin Berubah**:
  - `index.html`
  - `src/components/hero.js`
  - `src/styles/main.css`
- **Acceptance Criteria**:
  1. Hero menampilkan tajuk utama dan subjudul bertema agrowisata kakao Marga, Tabanan, Bali dengan rasio kontras teks minimal `8.9:1`.
  2. Klik tombol **"Lihat Katalog"** melakukan scroll halus ke area filter/grid produk.
  3. Klik tombol **"Kelola Stok"** mengalihkan tampilan langsung ke mode *Dashboard Demo*.

#### `TASK-02.3`: Komponen Grid & Kartu Produk + Fallback Gambar SVG
- **Deskripsi**: Merender daftar kartu produk responsif yang memuat gambar, badge *Unggulan*, badge status stok, tag kategori, nama produk, deskripsi, dan harga Rupiah.
- **Berkas yang Mungkin Berubah**:
  - `src/components/productGrid.js`
  - `src/utils/domUtils.js`
  - `public/assets/products/` (aset gambar placeholder/lokal)
- **Acceptance Criteria**:
  1. Grid menampilkan 1 kolom di mobile (`360px`), 2 kolom di tablet (`640px+`), dan 3–4 kolom sejajar di desktop (`1024px+`).
  2. Produk berstatus `unggulan: true` menampilkan lencana `★ Unggulan` berwarna emas rempah (`#B4691E`).
  3. Produk dengan `stok === 0` menampilkan lencana merah `"Stok Habis"`.
  4. Jika file gambar produk gagal dimuat (`onerror`), sistem otomatis menggantinya dengan placeholder SVG bertema kakao lokal tanpa menampilkan ikon broken image.

---

### MILESTONE 3: INTERAKSI PENCARIAN, FILTER & SORTING

#### `TASK-03.1`: Toolbar Pencarian Real-Time (Search)
- **Deskripsi**: Membangun kolom input pencarian yang memfilter daftar produk secara seketika berdasarkan substring pada `nama` atau `deskripsi` (*case-insensitive*).
- **Berkas yang Mungkin Berubah**:
  - `src/components/filterToolbar.js`
  - `src/utils/filterProducts.js`
- **Acceptance Criteria**:
  1. Mengetik kata kunci (misal: `"ginger"` atau `"organik"`) langsung memperbarui grid produk secara real-time di bawah `50ms`.
  2. Pencarian tidak sensitif huruf besar/kecil (*case-insensitive*) dan mencocokkan nama maupun deskripsi produk.
  3. Tersedia tombol hapus teks pencarian (`Clear`) yang mengembalikan daftar produk saat diklik.

#### `TASK-03.2`: Filter Kategori & Pengurutan (Sorting) + Empty State
- **Deskripsi**: Menghubungkan dropdown/pill kategori (*Semua*, *Dark Chocolate*, *Milk Chocolate*, *Bubuk & Biji Kakao*, *Kudapan & Cinderamata*) dan dropdown urutan (*Unggulan Utama*, *Harga: Rendah ke Tinggi*, *Harga: Tinggi ke Rendah*, *Nama: A - Z*), beserta tampilan *Empty State* jika hasil kosong.
- **Berkas yang Mungkin Berubah**:
  - `src/components/filterToolbar.js`
  - `src/utils/filterProducts.js`
  - `src/components/productGrid.js`
- **Acceptance Criteria**:
  1. Memilih kategori tertentu hanya menampilkan produk dalam kategori tersebut; memilih `"Semua"` menampilkan seluruh produk.
  2. Semua 4 opsi pengurutan menyusun ulang kartu produk dengan akurat.
  3. Kombinasi pencarian + filter kategori + pengurutan bekerja bersamaan secara sinkron.
  4. Jika hasil penyaringan bernilai `0` produk, muncul tampilan *Empty State* informatif dilengkapi tombol **"Reset Filter"**.

---

### MILESTONE 4: INTEGRASI PEMESANAN WHATSAPP

#### `TASK-04.1`: Generator Tautan WhatsApp & Logika Stok Kosong
- **Deskripsi**: Membuat fungsi pembuat tautan `https://wa.me/6281234567890?text=...` dengan encoding pesan otomatis yang memuat nama produk, harga, dan salam pembelian ke Cau Chocolates Bali, serta menonaktifkan tombol jika stok habis.
- **Berkas yang Mungkin Berubah**:
  - `src/utils/formatters.js`
  - `src/components/productGrid.js`
- **Acceptance Criteria**:
  1. Untuk produk dengan `stok > 0`, tombol **"Pesan via WhatsApp"** berwarna hijau daun (`#157A42`) dan membuka tab baru (`target="_blank"`, `rel="noopener noreferrer"`) ke URL `wa.me` valid.
  2. Isi pesan WhatsApp terenkripsi aman via `encodeURIComponent()` dan memuat nama produk, harga terformat Rupiah, serta identitas gerai Cau Chocolates Factory & Restaurant, Tabanan, Bali.
  3. Untuk produk dengan `stok === 0`, tombol berubah menjadi `"Stok Habis"`, memiliki atribut HTML `disabled`, `aria-disabled="true"`, bergaya visual nonaktif (`#E2E0D8`), dan tidak dapat diklik.

---

### MILESTONE 5: CRUD DASHBOARD PENGELOLA

#### `TASK-05.1`: Kartu Metrik Inventaris (KPI Cards)
- **Deskripsi**: Membangun 4 kartu ringkasan metrik di bagian atas Dashboard Demo untuk memantau kondisi stok secara langsung.
- **Berkas yang Mungkin Berubah**:
  - `src/components/dashboardView.js`
  - `src/styles/main.css`
- **Acceptance Criteria**:
  1. Menampilkan 4 metrik akurat: **Total Produk**, **Total Stok** (akumulasi unit), **Stok Habis** (jumlah produk berstok `0`), dan **Produk Unggulan**.
  2. Layout KPI tersusun rapi `2x2` pada layar mobile dan `4x1` sejajar pada layar tablet/desktop.
  3. Angka KPI otomatis diperbarui setiap kali terjadi operasi Tambah, Edit, Hapus, atau Reset produk.

#### `TASK-05.2`: Tampilan Daftar Inventaris Responsif (Read)
- **Deskripsi**: Menyajikan daftar seluruh produk pada dashboard menggunakan tata letak kartu inventaris bertumpuk (*stacked cards*) di layar mobile dan tabel terstruktur di layar desktop.
- **Berkas yang Mungkin Berubah**:
  - `src/components/dashboardView.js`
  - `src/styles/main.css`
- **Acceptance Criteria**:
  1. Setiap item inventaris menampilkan thumbnail gambar (dengan fallback SVG), nama produk, kategori, harga Rupiah, jumlah stok (dengan penanda merah bila `0`), status unggulan, serta tombol aksi **Edit** dan **Hapus**.
  2. Pada layar `360px`, seluruh informasi terbaca jelas tanpa pemotongan teks yang merusak tata letak.

#### `TASK-05.3`: Formulir Tambah (Create) & Ubah (Update) Produk
- **Deskripsi**: Membangun formulir terpadu di Dashboard Demo untuk menambah produk baru maupun menyunting data produk yang sudah ada dengan validasi input berlapis.
- **Berkas yang Mungkin Berubah**:
  - `src/components/productForm.js`
  - `src/components/dashboardView.js`
  - `src/utils/validators.js`
- **Acceptance Criteria**:
  1. Menambah produk baru memvalidasi: nama minimal 3 karakter (`trimmed`), kategori valid, harga `>= 0`, dan stok bilangan bulat (`integer >= 0`), lalu membuat ID unik otomatis.
  2. Klik tombol **Edit** pada suatu produk mengisi seluruh field formulir dengan data produk tersebut dan mengubah mode form menjadi *Edit Produk*.
  3. Menyimpan perubahan pada mode Create maupun Update langsung memperbarui Dashboard dan Katalog Belanja serta menampilkan notifikasi *toast* konfirmasi.

#### `TASK-05.4`: Hapus Produk (Delete) dengan Dialog Konfirmasi
- **Deskripsi**: Mengimplementasikan penghapusan produk dari inventaris yang dilindungi oleh konfirmasi eksplisit pengguna.
- **Berkas yang Mungkin Berubah**:
  - `src/components/dashboardView.js`
- **Acceptance Criteria**:
  1. Klik tombol **Hapus** memunculkan dialog konfirmasi sebelum penghapusan dilakukan.
  2. Jika pengguna memilih **Batal**, data produk tetap utuh.
  3. Jika pengguna mengonfirmasi **OK/Hapus**, produk dihapus dari daftar inventaris, KPI diperbarui, dan produk hilang dari Katalog Belanja.

---

### MILESTONE 6: PERSISTENSI `localStorage` & RESET

#### `TASK-06.1`: Layanan Penyimpanan `localStorage` & Fail-Safe Recovery
- **Deskripsi**: Mengenkapsulasi seluruh operasi baca/tulis data produk ke `localStorage` menggunakan kunci `cau_chocolates_catalog_data_v1` beserta mekanisme pemulihan otomatis jika data korup.
- **Berkas yang Mungkin Berubah**:
  - `src/services/storageService.js`
  - `src/main.js`
- **Acceptance Criteria**:
  1. Perubahan data dari operasi Tambah, Edit, dan Hapus tersimpan otomatis di `localStorage` pada kunci `cau_chocolates_catalog_data_v1` dan tetap bertahan setelah halaman di-refresh (`F5`).
  2. Jika `localStorage` kosong saat pertama kali dibuka, sistem otomatis menginisialisasi 8 produk awal (`initialProducts.js`).
  3. Jika nilai di `localStorage` sengaja dirusak menjadi JSON tidak valid, blok `try...catch` menangkap error dan memulihkan state ke 8 produk awal tanpa *blank screen*.

#### `TASK-06.2`: Fitur Reset ke Data Awal
- **Deskripsi**: Menyediakan tombol **"Reset ke Data Awal"** di Dashboard Demo untuk mengembalikan katalog ke kondisi 8 seed product bawaan pabrik.
- **Berkas yang Mungkin Berubah**:
  - `src/components/dashboardView.js`
  - `src/services/storageService.js`
- **Acceptance Criteria**:
  1. Klik tombol **"Reset ke Data Awal"** menampilkan dialog konfirmasi sebelum menimpa data lokal.
  2. Setelah dikonfirmasi, `localStorage` dan tampilan Dashboard maupun Katalog langsung kembali persis ke 8 produk awal Cau Chocolates Bali.

---

### MILESTONE 7: TESTING & VERIFIKASI KRITERIA (QA)

#### `TASK-07.1`: Eksekusi Pengujian Manual End-to-End (`AC-01` s.d. `AC-13`)
- **Deskripsi**: Menjalankan daftar periksa pengujian manual secara menyeluruh untuk memverifikasi seluruh skenario pengguna (Pembeli & Pengelola) dan skenario batas (*edge cases*).
- **Berkas yang Mungkin Berubah**:
  - `TASKS.md` (pembaruan status checklist QA)
  - Perbaikan bug minor pada `src/` bila ditemukan saat pengujian
- **Acceptance Criteria**:
  1. Seluruh 13 kriteria penerimaan (`AC-01` hingga `AC-13`) pada `SPEC.md` Bab 8 teruji dan berstatus **LULUS**.
  2. Pengujian responsivitas lintas viewport (`360px`, `768px`, `1280px`) berjalan mulus tanpa elemen tumpang tindih atau tombol terpotong.

---

### MILESTONE 8: SECURITY HARDENING & AKSESIBILITAS

#### `TASK-08.1`: Audit Anti-XSS, Sanitasi DOM & Keamanan Tautan
- **Deskripsi**: Memastikan seluruh perenderan teks dinamis bebas dari kerentanan Cross-Site Scripting (XSS) dan tidak ada kredensial sensitif di dalam kode sumber.
- **Berkas yang Mungkin Berubah**:
  - `src/utils/domUtils.js`
  - `src/components/productGrid.js`
  - `src/components/dashboardView.js`
- **Acceptance Criteria**:
  1. Tidak ada penggunaan `innerHTML` untuk merender data input pengguna (`nama`, `deskripsi`, `kategori`, `imageUrl`); seluruhnya menggunakan `.textContent` atau `document.createTextNode()`.
  2. Pengujian input payload `<img src=x onerror=alert('XSS')>` dan `<script>alert(1)</script>` tampil sebagai teks harfiah tanpa eksekusi skrip (`AC-13`).
  3. Tidak terdapat API key, token, atau kredensial rahasia apa pun dalam repositori maupun `localStorage`.

#### `TASK-08.2`: Verifikasi Aksesibilitas Kontras & Navigasi Keyboard
- **Deskripsi**: Mengaudit kesesuaian rasio kontras warna krem hangat & hijau rempah, atribut ARIA, label formulir, serta area sentuh tombol.
- **Berkas yang Mungkin Berubah**:
  - `src/styles/tokens.css`
  - `src/styles/main.css`
  - `index.html`
- **Acceptance Criteria**:
  1. Rasio kontras warna memenuhi standar WCAG 2.1 AA/AAA sesuai rincian `UI-SPEC.md` Bab 3.
  2. Seluruh input form memiliki elemen `<label>` yang terhubung dengan atribut `for` / `id`.
  3. Navigasi menggunakan tombol keyboard `Tab` dan `Enter` dapat menjangkau seluruh tab, filter, tombol WhatsApp aktif, dan form dashboard dengan indikator fokus yang terlihat jelas.

---

### MILESTONE 9: BUILD & OPTIMASI PRODUKSI

#### `TASK-09.1`: Kompilasi Bundel Produksi & Verifikasi Preview Lokal
- **Deskripsi**: Membangun bundel aplikasi statis menggunakan Vite dan memverifikasi bahwa aset lokal, gambar fallback, serta skrip berjalan identik pada mode produksi.
- **Berkas yang Mungkin Berubah**:
  - `vite.config.js`
  - `dist/` (hasil build tergenerate)
- **Acceptance Criteria**:
  1. Perintah `npm run build` selesai dengan exit code `0` tanpa warning atau error bundel.
  2. Perintah `npm run preview` menyajikan aplikasi dari folder `dist/` dengan seluruh fitur katalog, WhatsApp, CRUD, dan `localStorage` berfungsi normal.
  3. Path aset relatif bekerja dengan baik tanpa tautan mati (*404 Not Found*).

---

### MILESTONE 10: DEPLOYMENT & PANDUAN RILIS

#### `TASK-10.1`: Dokumentasi Proyek (`README.md`) & Konfigurasi Hosting Statis
- **Deskripsi**: Menyusun panduan instalasi, penggunaan, dan konfigurasi deployment statis (Vercel / Netlify / GitHub Pages) untuk demonstrasi Cau Chocolates Bali.
- **Berkas yang Mungkin Berubah**:
  - `README.md`
  - `vercel.json` atau `netlify.toml` (opsional jika diperlukan untuk hosting statis)
- **Acceptance Criteria**:
  1. `README.md` memuat deskripsi proyek Cau Chocolates Bali, struktur folder, cara menjalankan di lokal (`npm install`, `npm run dev`, `npm run build`), serta ringkasan fitur.
  2. Aplikasi berhasil di-deploy ke layanan hosting statis HTTPS dan dapat diakses dari perangkat mobile maupun desktop tanpa ketergantungan server backend.
  3. Smoke test pada URL produksi memastikan katalog awal 8 produk, tombol pesan WhatsApp, dan Dashboard Demo berjalan lancar.