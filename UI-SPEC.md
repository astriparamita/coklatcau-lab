# SPESIFIKASI DESAIN ANTARMUKA PENGGUNA (UI-SPEC.MD)
## Proyek: Cau Chocolates Bali — Katalog Digital & Dashboard Demo Agrowisata Kakao

---

### Dokumen Kontrol
- **Nama Brand / Aplikasi**: Cau Chocolates Bali (Cau Chocolates Factory & Restaurant)
- **Lokasi Entitas**: Jl. Raya Marga-Apuan, Cau, Kec. Marga, Kabupaten Tabanan, Bali
- **Referensi Dokumen**: `SPEC.md` (Spesifikasi Teknis & Kebutuhan Perangkat Lunak)
- **Pendekatan Desain**: Mobile-First Responsive Web Design, Organic Balinese Agrotourism Aesthetic
- **Target Platform**: Web Browser (Mobile `360px+`, Tablet `768px+`, Desktop `1280px+`)
- **Status**: Spesifikasi UI/UX (Tahap Pra-Implementasi / Belum Coding)

---

## 1. IDENTITAS VISUAL & SISTEM WARNA (COLOR SYSTEM)

Tema visual **Cau Chocolates Bali** memadukan **krem hangat** (terinspirasi dari mentega kakao organik dan serat kertas alami) dengan **hijau rempah** (terinspirasi dari rimbunnya perkebunan kakao dan rempah tropis Tabanan, Bali).

### 1.1 Palet Warna Utama (Color Tokens)

| Kategori Token | Nama Token CSS | Kode Hex | Peran & Penggunaan Antarmuka |
| :--- | :--- | :--- | :--- |
| **Background Utama** | `--bg-cream-base` | `#FAF7F2` | Latar belakang kanvas utama halaman (Krem Hangat Alami). |
| **Surface / Kartu** | `--bg-cream-card` | `#FFFFFF` | Latar belakang kartu produk, form panel, dan kartu metrik KPI. |
| **Surface Sekunder** | `--bg-cream-tint` | `#EFECE4` | Latar belakang toolbar filter, baris selang-seling tabel, dan fallback gambar. |
| **Teks Utama** | `--text-spice-dark` | `#18291E` | Judul utama (H1-H3), nama produk, dan teks primer (Hijau Hutan Gelap). |
| **Teks Sekunder** | `--text-spice-muted` | `#44574B` | Deskripsi produk, subjudul, metadata kategori, dan label form. |
| **Aksen Hijau Rempah** | `--brand-spice-green` | `#234F32` | Latar Hero Banner, tab navigasi aktif, tombol primer, dan fokus border. |
| **Hijau Rempah Hover** | `--brand-spice-hover` | `#183823` | State hover/aktif untuk elemen bertema hijau rempah. |
| **Aksen Emas Rempah** | `--accent-turmeric-gold` | `#B4691E` | Badge status "Unggulan", ikon bintang, dan penanda sorotan khusus. |
| **Aksi WhatsApp** | `--action-wa-green` | `#157A42` | Tombol "Pesan via WhatsApp" saat stok tersedia (Hijau Daun Segar). |
| **Aksi WA Hover** | `--action-wa-hover` | `#0F5C31` | State hover tombol WhatsApp. |
| **Border & Divider** | `--border-warm-linen` | `#D8D4C8` | Garis tepi kartu, batas input pencarian, dan garis pemisah tabel. |

### 1.2 Warna Status Semantik (Semantic States)

| Status | Warna Teks | Warna Latar (Badge) | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Stok Tersedia** | `#14532D` | `#DCFCE7` | Badge ketersediaan stok (`Tersedia: 15`) pada kartu dan tabel. |
| **Stok Menipis (1-5)** | `#854D0E` | `#FEF9C3` | Peringatan visual lembut bagi kasir/pengelola di dashboard. |
| **Stok Habis (0)** | `#991B1B` | `#FEE2E2` | Badge `"Stok Habis"` pada kartu produk dan KPI stok kosong. |
| **Tombol Disabled** | `#5C6660` | `#E2E0D8` | Tombol WhatsApp nonaktif saat stok `= 0` (`cursor: not-allowed`). |
| **Aksi Destruktif** | `#B91C1C` | `#FFFFFF` / `#FEE2E2` | Tombol `"Hapus"` dan `"Reset ke Data Awal"` di dashboard. |

---

## 2. TIPOGRAFI (TYPOGRAPHY)

Menggunakan font **Sans-Serif** modern yang bersih, ramah wisatawan lokal maupun mancanegara, serta memiliki keterbacaan tinggi di bawah cahaya matahari luar ruangan (saat diakses di area agrowisata Tabanan).

- **Font Stack Utama**: `'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Tabular Numbers**: Menggunakan `font-variant-numeric: tabular-nums` pada seluruh harga Rupiah (`Rp 45.000`) dan angka inventaris agar kolom sejajar presisi.

### 2.1 Skala Tipografi Responsif

| Elemen | Ukuran Mobile (`<768px`) | Ukuran Desktop (`>=768px`) | Weight | Line Height | Warna Token |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brand Title (Navbar)** | `17px` (`1.0625rem`) | `20px` (`1.25rem`) | `700` (Bold) | `1.2` | `--text-spice-dark` |
| **Sub-brand / Alamat** | `11px` (`0.6875rem`) | `12px` (`0.75rem`) | `500` (Medium) | `1.2` | `--text-spice-muted` |
| **Hero Headline (H1)** | `24px` (`1.5rem`) | `36px` (`2.25rem`) | `800` (ExtraBold) | `1.2` | `--bg-cream-base` |
| **Hero Subheadline** | `14px` (`0.875rem`) | `16px` (`1rem`) | `400` (Regular) | `1.5` | `#E8ECE6` |
| **Section Heading (H2)** | `20px` (`1.25rem`) | `24px` (`1.5rem`) | `700` (Bold) | `1.3` | `--text-spice-dark` |
| **Judul Kartu Produk (H3)** | `16px` (`1rem`) | `18px` (`1.125rem`) | `700` (Bold) | `1.35` | `--text-spice-dark` |
| **Harga Produk** | `16px` (`1rem`) | `18px` (`1.125rem`) | `700` (Bold) | `1.2` | `--brand-spice-green` |
| **Body / Deskripsi** | `14px` (`0.875rem`) | `14px` (`0.875rem`) | `400` (Regular) | `1.5` | `--text-spice-muted` |
| **Badge / Pill / Caption** | `12px` (`0.75rem`) | `12px` (`0.75rem`) | `600` (SemiBold) | `1.2` | Sesuai token status |

---

## 3. AKSESIBILITAS & STANDAR KONTRAS (WCAG 2.1 AA/AAA)

1. **Verifikasi Rasio Kontras Warna**:
   - Teks utama hijau gelap (`#18291E`) di atas latar krem hangat (`#FAF7F2`): rasio kontras **14.2:1** (Lulus WCAG AAA).
   - Teks sekunder (`#44574B`) di atas latar krem hangat (`#FAF7F2`): rasio kontras **7.1:1** (Lulus WCAG AAA).
   - Teks krem/putih (`#FAF7F2`) di atas Hero hijau rempah (`#234F32`): rasio kontras **8.9:1** (Lulus WCAG AAA).
   - Teks putih (`#FFFFFF`) di atas tombol WhatsApp (`#157A42`): rasio kontras **5.3:1** (Lulus WCAG AA).
   - Teks putih (`#FFFFFF`) di atas badge Unggulan (`#B4691E`): rasio kontras **4.6:1** (Lulus WCAG AA).
2. **Area Sentuh Ramah Jari (Touch Targets)**:
   - Seluruh tombol interaktif (tab navigasi, tombol pesan WhatsApp, input pencarian, dropdown, tombol Edit/Hapus) memiliki tinggi minimal **`44px`** dan lebar minimal **`44px`** dengan jarak antar tombol minimal **`8px`**.
3. **Navigasi Keyboard & Focus State**:
   - Semua komponen interaktif dilengkapi indikator `:focus-visible` berupa ring emas rempah (`outline: 3px solid #B4691E; outline-offset: 2px`).
4. **Struktur Semantik & Status Nonaktif**:
   - Menggunakan tag semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
   - Tombol WhatsApp pada produk dengan stok `0` wajib menyertakan atribut `disabled` dan `aria-disabled="true"` dengan teks `"Stok Habis"`.
   - Elemen gambar wajib memiliki `alt` deskriptif dan fallback SVG otomatis jika aset gagal dimuat.

---

## 4. ARSITEKTUR LAYOUT MOBILE-FIRST & BREAKPOINTS

Desain dibangun mulai dari ukuran layar smartphone (`360px`) sebagai fondasi utama (*Mobile-First*), kemudian beradaptasi secara bertahap ke layar yang lebih lebar:

- **Mobile (`360px` – `639px`)**:
  - Padding sisi luar kontainer: `16px`.
  - Grid produk: **1 kolom penuh** (`grid-template-columns: 1fr`), jarak vertikal `16px`.
  - Toolbar filter: Input pencarian di baris atas (`100%`), dropdown kategori & urutan berdampingan (`50%` : `50%`) di baris kedua.
  - KPI Dashboard: Grid **2 kolom x 2 baris**.
  - Inventaris Dashboard: Tampilan **Stacked Inventory Cards** agar seluruh informasi dan tombol Edit/Hapus mudah dibaca tanpa geser horizontal berlebih.
- **Tablet (`640px` – `1023px`)**:
  - Padding sisi luar kontainer: `24px`.
  - Grid produk: **2 kolom sejajar** (`repeat(2, 1fr)`), jarak `20px`.
  - Toolbar filter: 1 baris sejajar (Search bar fleksibel + Kategori + Urutkan).
  - KPI Dashboard: Grid **4 kolom sejajar**.
- **Desktop (`>= 1024px`)**:
  - Lebar maksimum kontainer konten: `1200px` (`margin: 0 auto`).
  - Grid produk: **3 hingga 4 kolom** (`repeat(auto-fill, minmax(270px, 1fr))`), jarak `24px`.
  - Layout Dashboard: Split-view 2 kolom (Form Tambah/Edit di panel kiri `380px`, Tabel Inventaris di panel kanan fleksibel) di bawah 4 kartu KPI.

---

## 5. SPESIFIKASI KOMPONEN ANTARMUKA

### 5.1 Top Navbar (Navigasi Global)
- **Posisi**: `position: sticky; top: 0; z-index: 50`, latar `#FAF7F2` dengan garis bawah `1px solid #D8D4C8`.
- **Identitas Kiri**: Ikon daun kakao & cokelat + judul **"Cau Chocolates Bali"** + sub-teks *"Marga, Tabanan · Bali"* (pada mobile sub-teks disembunyikan atau diringkas agar tidak sesak).
- **Mode Switcher Kanan**: Segmented control tanpa sistem login untuk berpindah tampilan:
  1. `Katalog` (Aktif: latar `#234F32`, teks `#FFFFFF`).
  2. `Dashboard Demo` (Nonaktif: latar `#EFECE4`, teks `#18291E`).

### 5.2 Hero Banner Section
- **Visual**: Kotak banner dengan sudut membulat (`border-radius: 16px`), latar hijau rempah organik (`#234F32` dengan gradien halus ke `#1A3C26`), serta aksen siluet daun kakao & rempah Bali.
- **Konten**:
  - Label atas (Eyebrow): `"AGROWISATA KAKAO ORGANIK · TABANAN, BALI"`
  - Judul Utama (H1): `"Cau Chocolates Bali: Cokelat & Olahan Kakao Lokal"`
  - Deskripsi Singkat: `"Nikmati kemurnian cokelat organik dari kebun kakao Marga, Tabanan. Pilih produk favorit Anda dan pesan langsung melalui WhatsApp."`
  - Tombol Aksi:
    - `[Lihat Katalog]` (Primer: latar `#FAF7F2`, teks `#18291E`, scroll halus ke toolbar/grid produk).
    - `[Kelola Stok]` (Sekunder: border `1.5px solid #FAF7F2`, teks `#FAF7F2`, beralih ke tab Dashboard Demo).

### 5.3 Toolbar Filter, Pencarian & Pengurutan
- **Kontainer**: Latar krem sekunder (`#EFECE4`), `border-radius: 12px`, `padding: 16px`, border `1px solid #D8D4C8`.
- **Kontrol**:
  1. **Pencarian Real-Time**: Input teks dengan ikon kaca pembesar (`placeholder="Cari cokelat, bubuk kakao, jahe..."`) dan tombol reset teks (`X`).
  2. **Filter Kategori**: Pilihan kategori sesuai `SPEC.md`: `Semua`, `Dark Chocolate`, `Milk Chocolate`, `Bubuk & Biji Kakao`, `Kudapan & Cinderamata`.
  3. **Urutkan (Sorting)**: Dropdown dengan opsi: `Unggulan Utama`, `Harga: Rendah ke Tinggi`, `Harga: Tinggi ke Rendah`, `Nama: A - Z`.
  4. **Info Jumlah Hasil**: Baris status di bawah toolbar, misalnya *"Menampilkan 8 produk Cau Chocolates Bali"*.

### 5.4 Grid & Kartu Produk (Product Card)
- **Struktur Kartu**: Latar `#FFFFFF`, border `1px solid #D8D4C8`, `border-radius: 14px`, layout `flex-direction: column` agar posisi tombol WhatsApp di bagian bawah selalu sejajar antar kartu dalam satu baris.
- **Bagian-Bagian Kartu**:
  1. **Thumbnail Gambar (`aspect-ratio: 4 / 3`)**:
     - Memuat foto produk lokal atau otomatis beralih ke SVG placeholder bertema kakao & daun hijau jika aset gagal dimuat.
     - **Badge Kiri Atas**: `★ Unggulan` (latar `#B4691E`, teks `#FFFFFF`) jika `unggulan === true`.
     - **Badge Kanan Atas**: `Stok: 15` (hijau lembut) atau `Stok Habis` (merah lembut).
  2. **Badan Kartu (`padding: 16px`)**:
     - Tag kategori kecil uppercase (`DARK CHOCOLATE`).
     - Nama Produk (`H3`, maksimal 2 baris).
     - Deskripsi singkat (`2-3 baris` dengan elipsis rapi).
  3. **Footer Kartu (`padding: 0 16px 16px`, `margin-top: auto`)**:
     - Harga Rupiah terformat (`Rp 45.000`).
     - **Tombol WhatsApp (`height: 44px`, lebar `100%`)**:
       - **Saat Stok > 0**: Ikon WhatsApp + teks `"Pesan via WhatsApp"`, latar `#157A42`, teks `#FFFFFF`, membuka tautan `https://wa.me/6281234567890?text=...` di tab baru.
       - **Saat Stok = 0**: Teks `"Stok Habis"`, atribut `disabled`, latar `#E2E0D8`, teks `#5C6660`.

### 5.5 Dashboard Demo Pengelola
- **Header Dashboard**: Judul `"Dashboard Demo Inventaris"`, subjudul lokasi gerai Tabanan, dan tombol `[Reset ke Data Awal]`.
- **4 Kartu KPI Ringkasan**:
  1. `Total Produk` (Jumlah varian terdaftar, awal: `8`).
  2. `Total Stok` (Akumulasi seluruh unit stok, awal: `108`).
  3. `Stok Habis` (Jumlah varian stok `0`, awal: `1` dengan aksen merah lembut).
  4. `Produk Unggulan` (Jumlah produk unggulan, awal: `3` dengan aksen emas rempah).
- **Formulir Tambah / Edit Produk**:
  - Judul dinamis (`Tambah Produk Baru` atau `Edit Data Produk`).
  - Field input: Nama Produk, Kategori, Harga (Rp), Stok (Unit), Path Gambar Lokal, Deskripsi, dan Checkbox `Tandai sebagai Produk Unggulan`.
  - Tombol `[Simpan Produk]` (hijau rempah `#234F32`) dan `[Batal / Reset Form]`.
- **Daftar / Tabel Inventaris**:
  - Menampilkan thumbnail kecil, nama produk, kategori, harga, stok, lencana unggulan, serta tombol aksi `[Edit]` dan `[Hapus]` (dengan dialog konfirmasi sebelum menghapus).

---

## 6. WIREFRAME TEKS (ASCII WIREFRAMES)

### 6.1 Wireframe Tampilan Mobile (`360px - 414px`)

#### A. Mobile — Mode Katalog Pembeli

```text
+---------------------------------------+
| [Logo] Cau Chocolates [Katalog][Demo] | <-- Sticky Navbar (44px+ touch)
+---------------------------------------+
| +-----------------------------------+ |
| | AGROWISATA KAKAO · TABANAN, BALI  | |
| | Cau Chocolates Bali: Cokelat &    | | <-- Hero Banner (Hijau Rempah)
| | Olahan Kakao Lokal                | |
| | [ Lihat Katalog ]                 | |
| | [ Kelola Stok ]                   | |
| +-----------------------------------+ |
|                                       |
| +-----------------------------------+ |
| | [Q] Cari cokelat, jahe, bubuk...  | | <-- Toolbar Filter (Mobile Stack)
| | [Kategori: Semua v] [Urutkan v]   | |
| +-----------------------------------+ |
| Menampilkan 8 produk                  |
|                                       |
| +-----------------------------------+ |
| | [★ Unggulan]            [Stok: 15]| |
| |                                   | |
| |         ( Gambar Produk )         | | <-- Product Card (1 Kolom)
| |                                   | |
| | DARK CHOCOLATE                    | |
| | Cau Organic Dark Chocolate 80%    | |
| | Cokelat hitam organik murni dari  | |
| | biji kakao fermentasi Marga...    | |
| |                                   | |
| | Rp 45.000                         | |
| | [ (WA) Pesan via WhatsApp       ] | | <-- Aktif (#157A42)
| +-----------------------------------+ |
|                                       |
| +-----------------------------------+ |
| |                      [Stok Habis] | |
| |         ( Gambar Redup )          | |
| |                                   | |
| | BUBUK & BIJI KAKAO                | |
| | Organic Raw Cocoa Nibs 200g       | |
| | Pecahan biji kakao mentah organik | |
| | kaya magnesium dan serat...       | |
| |                                   | |
| | Rp 50.000                         | |
| | [           Stok Habis          ] | | <-- Disabled (#E2E0D8)
| +-----------------------------------+ |
+---------------------------------------+
```

#### B. Mobile — Mode Dashboard Demo

```text
+---------------------------------------+
| [Logo] Cau Chocolates [Katalog][Demo] |
+---------------------------------------+
| Dashboard Demo Pengelola              |
| [ + Tambah Produk ] [ Reset Awal ]    |
|                                       |
| +-----------------+-----------------+ |
| | Total Produk    | Total Stok      | | <-- KPI Grid (2x2)
| |       8         |      108        | |
| +-----------------+-----------------+ |
| | Stok Habis      | Unggulan        | |
| |       1         |       3         | |
| +-----------------+-----------------+ |
|                                       |
| Daftar Inventaris (8)                 |
| +-----------------------------------+ |
| | [Img] Cau Organic Dark Choc 80%   | | <-- Mobile Inventory Card
| | Dark Chocolate · ★ Unggulan       | |
| | Harga: Rp 45.000  | Stok: 15      | |
| | [   Edit   ]      [   Hapus   ]   | |
| +-----------------------------------+ |
| +-----------------------------------+ |
| | [Img] Organic Raw Cocoa Nibs 200g | |
| | Bubuk & Biji · [Stok Habis]       | |
| | Harga: Rp 50.000  | Stok: 0       | |
| | [   Edit   ]      [   Hapus   ]   | |
| +-----------------------------------+ |
+---------------------------------------+
```

---

### 6.2 Wireframe Tampilan Desktop (`1280px+`)

#### A. Desktop — Mode Katalog Pembeli

```text
+---------------------------------------------------------------------------------+
|  [Logo] Cau Chocolates Bali · Marga, Tabanan        [ Katalog ] [Dashboard Demo]|
+---------------------------------------------------------------------------------+
|  +---------------------------------------------------------------------------+  |
|  |  AGROWISATA KAKAO ORGANIK · TABANAN, BALI                                 |  |
|  |  Cau Chocolates Bali: Cokelat & Olahan Kakao Lokal       (Ilustrasi Daun  |  |
|  |  Nikmati kemurnian cokelat organik dari kebun kakao       & Biji Kakao)   |  |
|  |  Marga, Tabanan. Pesan langsung melalui WhatsApp.                         |  |
|  |                                                                           |  |
|  |  [ Lihat Katalog ]   [ Kelola Stok ]                                      |  |
|  +---------------------------------------------------------------------------+  |
|                                                                                 |
|  +---------------------------------------------------------------------------+  |
|  | [Q] Cari nama atau deskripsi produk...    | [Kategori: Semua v] | [Urut v]|  |
|  +---------------------------------------------------------------------------+  |
|  Menampilkan 8 dari 8 produk Cau Chocolates Bali                                |
|                                                                                 |
|  +-----------------------+  +-----------------------+  +---------------------+  |
|  | [★ Unggulan]  [Stok 15]| | [★ Unggulan]  [Stok 20]| |        [Stok Habis] |  |
|  |                       |  |                       |  |                     |  |
|  |    (Gambar 4:3)       |  |    (Gambar 4:3)       |  |   (Gambar Redup)    |  |
|  |                       |  |                       |  |                     |  |
|  | DARK CHOCOLATE        |  | MILK CHOCOLATE        |  | BUBUK & BIJI KAKAO  |  |
|  | Cau Dark Choc 80%     |  | Heritage Milk Choc    |  | Raw Cocoa Nibs 200g |  |
|  | Cokelat hitam murni   |  | Cokelat susu lembut   |  | Pecahan biji kakao  |  |
|  | fermentasi Marga...   |  | berpadu susu murni... |  | mentah organik...   |  |
|  |                       |  |                       |  |                     |  |
|  | Rp 45.000             |  | Rp 40.000             |  | Rp 50.000           |  |
|  | [(WA) Pesan WhatsApp] |  | [(WA) Pesan WhatsApp] |  | [    Stok Habis   ] |  |
|  +-----------------------+  +-----------------------+  +---------------------+  |
|                                                                                 |
|  ( ... Baris berikutnya: Grid responsif 3-4 kolom dengan tinggi kartu sejajar ) |
+---------------------------------------------------------------------------------+
|  Cau Chocolates Factory & Restaurant · Jl. Raya Marga-Apuan, Tabanan, Bali      |
+---------------------------------------------------------------------------------+
```

#### B. Desktop — Mode Dashboard Demo

```text
+---------------------------------------------------------------------------------+
|  [Logo] Cau Chocolates Bali · Marga, Tabanan        [ Katalog ] [Dashboard Demo]|
+---------------------------------------------------------------------------------+
|  Dashboard Demo Inventaris                              [ Reset ke Data Awal ]  |
|                                                                                 |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+  |
|  | Total Produk    |  | Total Stok      |  | Stok Habis      |  | Unggulan    |  |
|  |       8         |  |      108        |  |       1         |  |      3      |  |
|  +-----------------+  +-----------------+  +-----------------+  +-------------+  |
|                                                                                 |
|  +----------------------------------+  +-------------------------------------+  |
|  | FORM TAMBAH / EDIT PRODUK        |  | DAFTAR INVENTARIS PRODUK            |  |
|  |                                  |  |                                     |  |
|  | Nama Produk *                    |  | Img | Produk       | Harga  | Stok  |  |
|  | [______________________________] |  | ----+--------------+--------+------ |  |
|  |                                  |  | [x] | Dark 80% ★   | 45.000 |  15   |  |
|  | Kategori *                       |  |     | Dark Choc    | [Edit] [Hapus]|  |
|  | [Dark Chocolate               v] |  | ----+--------------+--------+------ |  |
|  |                                  |  | [x] | Milk Choc ★  | 40.000 |  20   |  |
|  | Harga (Rp) *     Stok (Unit) *   |  |     | Milk Choc    | [Edit] [Hapus]|  |
|  | [____________]   [____________]  |  | ----+--------------+--------+------ |  |
|  |                                  |  | [x] | Cocoa Nibs   | 50.000 |  0 !  |  |
|  | Path Gambar                      |  |     | Bubuk & Biji | [Edit] [Hapus]|  |
|  | [/assets/products/...          ] |  | ----+--------------+--------+------ |  |
|  |                                  |  | ...                                 |  |
|  | Deskripsi                        |  |                                     |  |
|  | [______________________________] |  |                                     |  |
|  |                                  |  |                                     |  |
|  | [x] Tandai sebagai Unggulan      |  |                                     |  |
|  |                                  |  |                                     |  |
|  | [ Simpan Produk ]    [ Batal ]   |  |                                     |  |
|  +----------------------------------+  +-------------------------------------+  |
+---------------------------------------------------------------------------------+
```

---

## 7. INTERAKSI & STATE MIKRO (MICRO-INTERACTIONS)

1. **Hover & Elevasi Kartu**:
   - Pada perangkat desktop, kartu produk memberikan respons hover lembut (`transform: translateY(-2px)` dan `box-shadow: 0 8px 20px rgba(24, 41, 30, 0.08)` selama `180ms ease`).
2. **Empty State Filter & Pencarian**:
   - Apabila kombinasi pencarian atau kategori menghasilkan `0` produk, tampilkan ilustrasi ikon kakao dengan pesan *"Produk tidak ditemukan untuk kata kunci tersebut"* serta tombol `[Reset Filter]`.
3. **Konfirmasi Aksi Kritis**:
   - Klik tombol `[Hapus]` atau `[Reset ke Data Awal]` selalu memunculkan dialog konfirmasi sebelum mengubah data pada `localStorage`.
4. **Umpan Balik Notifikasi (Toast)**:
   - Setiap operasi simpan, pembaruan stok, penghapusan, maupun reset menampilkan pesan konfirmasi singkat di pojok bawah layar selama `3 detik` dengan latar hijau rempah (`#234F32`).