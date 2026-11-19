# SPESIFIKASI TEKNIS & KEBUTUHAN PERANGKAT LUNAK (SPEC.MD)
## Proyek: Cau Chocolates Catalog (Katalog Produk UMKM)

---

### Dokumen Kontrol
- **Nama Sistem**: Cau Chocolates Catalog
- **Entitas Usaha**: Cau Chocolates Factory & Restaurant (Jl. Raya Marga-Apuan, Cau, Kec. Marga, Kabupaten Tabanan, Bali)
- **Peran Penyusun**: System Analyst & Software Engineer
- **Target Pengerjaan**: 1 Hari Latihan Praktik (1-Day Intensive Practice)
- **Arsitektur**: Single-Page Web Application (SPA) - Client-side Only (No Backend)
- **Tech Stack**: Vite + Vanilla JavaScript (ES Modules), HTML5, CSS3 Modern

---

## 1. TUJUAN (OBJECTIVES)

### 1.1 Latar Belakang
Cau Chocolates Bali merupakan destinasi agrowisata dan produsen cokelat organik terkemuka di Tabanan, Bali yang mengolah biji kakao lokal menjadi berbagai produk turunan cokelat berkualitas tinggi. Dalam operasional harian dan promosi kepada wisatawan maupun pelanggan lokal, dibutuhkan sarana katalog digital yang cepat, interaktif, dan mudah dikelola tanpa ketergantungan pada infrastruktur server atau backend yang rumit.

### 1.2 Tujuan Aplikasi
1. **Etalase Digital Mandiri**: Menyediakan katalog interaktif untuk menampilkan produk olahan kakao dan cokelat Cau Chocolates Bali secara informatif dan estetis.
2. **Kanal Konversi Cepat ke WhatsApp**: Memudahkan calon pembeli melakukan pemesanan langsung ke nomor WhatsApp resmi Cau Chocolates Bali melalui template pesan otomatis yang memuat rincian nama dan harga produk.
3. **Pusat Kelola Demo Terpadu**: Memberikan fasilitas manajemen inventaris sederhana (CRUD produk, pemantauan total stok, dan indikator stok habis) yang dapat dioperasikan langsung pada perangkat yang sama tanpa autentikasi rumit.
4. **Pembelajaran Praktis Berkualitas**: Dirancang sebagai proyek latihan intensif 1 hari dengan arsitektur modular, bebas kerentanan injeksi skrip (XSS-safe), dan data persisten di peramban pengguna.

---

## 2. PENGGUNA (USER PERSONAS & SCENARIOS)

Aplikasi dirancang untuk digunakan pada **satu perangkat yang sama** (shared device) tanpa sistem autentikasi atau login palsu. Perpindahan peran dilakukan melalui navigasi antarmuka (toggle/tab navigasi: *Mode Katalog Pembeli* dan *Dashboard Pengelola*).

### 2.1 Persona 1: Calon Pembeli (Wisatawan / Pelanggan)
- **Karakteristik**: Wisatawan lokal/internasional atau pelanggan toko yang mengakses katalog dari tablet toko atau ponsel.
- **Tujuan Utama**:
  - Menjelajahi ragam produk cokelat (dark, milk, bubuk kakao, cinderamata).
  - Mencari produk spesifik atau menyaring berdasarkan kategori dan urutan harga.
  - Memeriksa ketersediaan stok produk.
  - Menekan tombol pesan untuk langsung terhubung ke WhatsApp pengelola toko dengan pesan yang sudah terisi otomatis.

### 2.2 Persona 2: Pengelola Toko / Kasir Cau Chocolates Bali
- **Karakteristik**: Petugas toko atau staf kasir di Cau Chocolates Factory & Restaurant.
- **Tujuan Utama**:
  - Melihat ringkasan inventaris (total macam produk, total stok tersedia, produk yang kehabisan stok).
  - Menambahkan varian produk baru.
  - Memperbarui data harga, stok, atau deskripsi produk jika ada perubahan.
  - Menghapus produk yang sudah tidak diproduksi lagi.
  - Mengembalikan data ke kondisi bawaan pabrik (seed data default) jika data demo perlu direset.

---

## 3. DAFTAR FITUR & TATA LETAK ANTARMUKA (UI LAYOUT & FEATURES)

### 3.0 Diagram Wireframe Antarmuka (ASCII Wireframe Layout)

Aplikasi mengadopsi tata letak terpadu yang memadukan etalase interaktif dan panel kontrol pengelola:

```text
+-------------------------------------------------------------------+
| [Cau Chocolates Bali]                  [Katalog] [Dashboard Demo] |
+-------------------------------------------------------------------+
| HERO: Cau Chocolates Bali · Cokelat & Olahan Kakao Lokal          |
| [Lihat Katalog]  [Kelola Stok]                                    |
+-------------------------------------------------------------------+
| [Cari cokelat...        ] [Kategori: Semua v] [Urutkan: Unggulan v]
+-------------------------------------------------------------------+
| [Unggulan] [Img]     | [Unggulan] [Img]     | [Img]               |
| Dark 70% · Rp 55.000 | Brownie Box · Rp 65k | Sea Salt · Rp 58.000|
| Stok: 16             | Stok: 10             | Stok Habis (0)      |
| [Pesan via WhatsApp] | [Pesan via WhatsApp] | [Stok Habis (Off)]  |
+-------------------------------------------------------------------+
| DASHBOARD: [Total: 8] [Stok: 101] [Habis: 1]                      |
| [Form Create/Update] | [Daftar Produk: Edit | Hapus] + [Reset]    |
+-------------------------------------------------------------------+
```

#### Pemetaan Komponen Antarmuka:
1. **Top Navigation Bar**: Brand logo & title Cau Chocolates Bali, serta switch navigation tab (`Katalog` dan `Dashboard Demo`).
2. **Hero Banner Section**: Menampilkan tajuk utama agrowisata Cau Chocolates Bali dengan tombol aksi cepat (*Lihat Katalog* mengarahkan ke grid produk, *Kelola Stok* mengarahkan ke dashboard pengelola).
3. **Toolbar Filter & Search**: 
   - Input pencarian real-time (`[Cari cokelat...]`).
   - Dropdown filter kategori (`[Kategori: Semua v]`).
   - Dropdown pengurutan produk (`[Urutkan: Unggulan v]`).
4. **Product Grid (Katalog)**:
   - Kartu produk responsif dengan thumbnail gambar & badge `Unggulan`.
   - Informasi nama, kategori, harga Rupiah, dan stok.
   - Status stok habis dengan visual khusus.
   - Tombol aksi WhatsApp: aktif dengan URL generator jika stok > 0, dan `disabled` (nonaktif) saat stok bernilai 0.
5. **Dashboard Demo Section**:
   - Status bar ringkasan KPI: `Total Produk`, `Total Stok`, dan `Stok Habis`.
   - Split layout: Formulir Tambah/Edit Produk di sisi kiri, dan Tabel Inventaris (dengan tombol Aksi Edit, Hapus, dan Reset Data Awal) di sisi kanan/bawah.

---

### 3.1 Navigasi Global
- **Header Toko**: Menampilkan identitas Cau Chocolates Bali, logo/ikon cokelat, dan alamat ringkas (*Jl. Raya Marga-Apuan, Cau, Kec. Marga, Tabanan, Bali*).
- **Mode Switcher**: Tombol navigasi untuk beralih secara instan antara tampilan:
  1. `Katalog Belanja` (Tampilan Publik Pembeli)
  2. `Dashboard Pengelola` (Tampilan Admin Inventaris)

---

### 3.2 Fitur Katalog Pembeli (Storefront)

| ID Fitur | Nama Fitur | Deskripsi & Logika Bisnis |
| :--- | :--- | :--- |
| **ST-01** | **Katalog 8 Produk Tematik Cau Chocolates** | Menampilkan 8 produk awal bertema cokelat & kakao Cau Chocolates Bali dengan minimal 1 produk berstatus stok 0 (habis). |
| **ST-02** | **Kartu Produk Informatif** | Setiap kartu memuat: foto/placeholder, nama produk, tag kategori, harga Rupiah terformat (`Rp X.XXX`), status badge stok (Tersedia / Stok Habis), status unggulan (badge bintang/khusus), dan deskripsi. |
| **ST-03** | **Pencarian Real-Time** | Input pencarian dinamis yang memfilter produk seketika saat pengguna mengetik (mencocokkan substring pada `nama` ATAU `deskripsi`, *case-insensitive*). |
| **ST-04** | **Filter Kategori** | Memilih kategori produk melalui dropdown atau pill buttons (Pilihan: *Semua*, *Dark Chocolate*, *Milk Chocolate*, *Bubuk & Biji Kakao*, *Kudapan & Cinderamata*). |
| **ST-05** | **Pengurutan (Sorting)** | Mengurutkan daftar produk berdasarkan: <br>1. *Unggulan Utama* (Produk bertanda unggulan di atas)<br>2. *Harga: Rendah ke Tinggi*<br>3. *Harga: Tinggi ke Rendah*<br>4. *Nama: A - Z* |
| **ST-06** | **Pemesanan via WhatsApp** | Tombol bertautan `https://wa.me/<nomor_toko>?text=<pesan_terenkripsi>`.<br>- Pesan otomatis mencantumkan nama produk, harga, dan salam pembelian ke Cau Chocolates Bali.<br>- **Aturan Stok**: Tombol **wajib dinonaktifkan (`disabled`)** jika stok produk bernilai `0`. |
| **ST-07** | **Fallback Gambar Otomatis** | Menggunakan aset lokal relatif. Jika berkas gambar tidak ditemukan atau gagal dimuat, sistem otomatis beralih ke placeholder SVG/kanvas lokal terintegrasi tanpa merusak tata letak kartu. |

---

### 3.3 Fitur Dashboard Demo Pengelola (Store Management)

| ID Fitur | Nama Fitur | Deskripsi & Logika Bisnis |
| :--- | :--- | :--- |
| **DB-01** | **Ringkasan Inventaris (KPI Cards)** | Menampilkan metrik utama toko:<br>1. **Total Produk**: Jumlah seluruh varian produk yang terdaftar.<br>2. **Total Stok**: Akumulasi seluruh unit stok yang ada.<br>3. **Stok Habis**: Jumlah varian produk yang stoknya bernilai `0`.<br>4. **Produk Unggulan**: Jumlah produk dengan status unggulan aktif. |
| **DB-02** | **Tabel Inventaris Produk (Read)** | Menampilkan seluruh data produk dalam tabel rapi mencakup thumbnail gambar, nama, kategori, harga, stok, badge unggulan, serta kolom aksi (*Edit* dan *Hapus*). |
| **DB-03** | **Tambah Produk Baru (Create)** | Modal/Formulir tambah produk dengan validasi input wajib: nama, kategori, harga (>= 0), stok (integer >= 0), deskripsi, URL gambar lokal, dan checkbox unggulan. ID di-generate secara otomatis dan unik. |
| **DB-04** | **Ubah Data Produk (Update)** | Modal/Formulir edit yang memuat data produk terpilih untuk diubah nilai harga, stok, deskripsi, kategori, maupun status unggulannya. |
| **DB-05** | **Hapus Produk (Delete)** | Menghapus produk dari daftar dengan konfirmasi keamanan (`window.confirm` atau modal konfirmasi konfirmasi dialog) untuk mencegah aksi tidak disengaja. |
| **DB-06** | **Reset ke Data Awal** | Tombol khusus untuk menghapus perubahan lokal dan mengembalikan katalog ke 8 produk awal (seed data) Cau Chocolates Bali. Disertai konfirmasi sebelum eksekusi. |
| **DB-07** | **Persistensi `localStorage`** | Semua operasi CRUD dan reset disimpan langsung pada `localStorage` peramban dengan kunci `cau_chocolates_catalog_data_v1`. |

---

## 4. DATA MODEL & SEED DATA

### 4.1 Skema Data Entitas `Product`

```typescript
interface Product {
  id: string;          // String unik, non-empty (misal: "cau-prod-001" atau timestamp unik)
  nama: string;        // Nama produk, wajib diisi, non-empty (trimmed)
  kategori: string;    // Kategori produk, wajib diisi
  harga: number;       // Bilangan positif atau nol (>= 0)
  stok: number;        // Bilangan bulat non-negatif (integer >= 0)
  deskripsi: string;   // Penjelasan ringkas karakteristik produk
  imageUrl: string;    // Path relatif ke aset lokal (misal: "/assets/products/cau-dark-80.jpg")
  unggulan: boolean;   // Status penanda produk favorit/rekomendasi
}
```

### 4.2 Aturan Validasi Model
- `id`: Wajib ada, string unik, tidak boleh ada duplikasi.
- `nama`: String minimal 3 karakter setelah spasi luar dibersihkan (`trim`).
- `kategori`: Wajib salah satu kategori valid (*Dark Chocolate*, *Milk Chocolate*, *Bubuk & Biji Kakao*, *Kudapan & Cinderamata*).
- `harga`: Tipe data `number`, nilai `>= 0`. Harus divalidasi `!isNaN(harga)`.
- `stok`: Tipe data `integer`, nilai `>= 0`. Harus divalidasi `Number.isInteger(stok) && stok >= 0`.
- `deskripsi`: String, opsional (boleh kosong atau teks penjelasan).
- `imageUrl`: String, path relatif lokal ke folder proyek.
- `unggulan`: Boolean (`true` atau `false`).

---

### 4.3 Data Awal (8 Seed Products Bertema Cau Chocolates Bali)

| No | ID | Nama Produk | Kategori | Harga (IDR) | Stok | Unggulan | Deskripsi Singkat |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| 1 | `cau-prod-001` | **Cau Organic Dark Chocolate 80%** | Dark Chocolate | Rp 45.000 | 15 | `true` | Cokelat hitam organik murni dari biji kakao fermentasi khas Marga, Tabanan dengan cita rasa pekat dan sedikit rasa buah tropis. |
| 2 | `cau-prod-002` | **Cau Tabanan Heritage Milk Chocolate** | Milk Chocolate | Rp 40.000 | 20 | `true` | Cokelat susu lembut berpadu dengan susu murni lokal Bali, menciptakan tekstur lumer dan manis pas di lidah. |
| 3 | `cau-prod-003` | **Cau Pure Organic Cocoa Powder 250g** | Bubuk & Biji Kakao | Rp 55.000 | 12 | `false` | Bubuk kakao murni tanpa pemanis tambahan, ideal untuk minuman hangat, adonan kue, atau smoothie sehat harian. |
| 4 | `cau-prod-004` | **Roasted Cocoa Beans with Sea Salt** | Kudapan & Cinderamata | Rp 35.000 | 18 | `false` | Biji kakao sangrai pilihan bertabur garam laut tradisional Kusamba Bali, cemilan kaya antioksidan dan renyah. |
| 5 | `cau-prod-005` | **Cau Dark Chocolate 60% with Bali Ginger** | Dark Chocolate | Rp 45.000 | 8 | `true` | Kombinasi eksotis cokelat hitam 60% dengan sensasi hangat jahe merah Bali asli perkebunan Tabanan. |
| 6 | `cau-prod-006` | **Organic Raw Cocoa Nibs 200g** | Bubuk & Biji Kakao | **Rp 50.000** | **0** | `false` | *Pecahan biji kakao mentah organik kaya magnesium dan serat. (Stok habis/menunggu masa panen baru).* |
| 7 | `cau-prod-007` | **Cau Balinese Cocoa Tea Husk 100g** | Kudapan & Cinderamata | Rp 30.000 | 25 | `false` | Teh herbal aromatik yang diseduh dari kulit biji kakao pilihan dengan aroma cokelat alami yang menenangkan tanpa kafein tinggi. |
| 8 | `cau-prod-008` | **Cau Artisan Coffee Cocoa Bar 55%** | Dark Chocolate | Rp 42.000 | 10 | `false` | Paduan istimewa kakao organik Cau dan biji kopi Robusta pupuan Tabanan dengan aroma harum dan rasa seimbang. |

> **Catatan Validasi Spesifikasi**: Produk ke-6 (`cau-prod-006`) memiliki nilai `stok = 0`, memenuhi kriteria wajib bahwa minimal terdapat 1 produk bersaldo stok nol untuk pengujian kondisi stok habis.

---

### 4.4 Konfigurasi Pemesanan WhatsApp
- **Nomor Kontak Default**: `6281234567890` (Nomor perwakilan gerai Cau Chocolates Factory & Restaurant, Bali).
- **Format Tautan**: `https://wa.me/6281234567890?text={encoded_message}`
- **Struktur Pesan (Template)**:
  ```text
  Halo Admin Cau Chocolates Bali!
  Saya ingin memesan produk olahan kakao berikut:
  - Produk: [Nama Produk]
  - Harga: [Rp X.XXX]
  - Asal Gerai: Cau Chocolates Factory & Restaurant, Tabanan, Bali

  Mohon info ketersediaan dan ongkos kirim. Terima kasih!
  ```

---

## 5. NONFUNCTIONAL REQUIREMENTS (NFR)

### 5.1 Keamanan & Sanitasi Data (Security Guardrails)
1. **Pencegahan Cross-Site Scripting (XSS)**:
   - Dilarang merender input teks dari pengguna (nama produk, deskripsi, kategori) langsung menggunakan `innerHTML`.
   - Wajib menggunakan properti aman seperti `.textContent`, `document.createTextNode()`, atau helper sanitasi untuk memasukkan data dinamis ke dalam DOM.
2. **Tanpa Kredensial Sensitif**:
   - Tidak ada token rahasia, API key pihak ketiga, atau password yang disimpan di dalam kode sumber maupun `localStorage`.
3. **Penyimpanan Aman di Klien**:
   - `localStorage` hanya dipakai untuk menyimpan struktur data array produk JSON yang telah tervalidasi.

### 5.2 Performa & Keringanan (Performance)
1. **Zero-Backend Dependency**: Seluruh logika dijalankan pada peramban klien tanpa request jaringan tambahan selain memuat bundel lokal.
2. **Latensi Render**: Waktu respons filter dan pencarian real-time di bawah 50 milidetik untuk katalog latihan.
3. **Ukuran Bundel**: Bebas dari framework eksternal berat (React/Vue/Angular), hanya Vanilla JavaScript standar berbasis ES Module modern.

### 5.3 Keandalan & Ketahanan (Reliability & Robustness)
1. **Fallback Gambar**: Kartu produk wajib menangani event `error` (`img.onerror`) secara graceful dengan menampilkan placeholder SVG lokal bertema cokelat jika berkas aset tidak ditemukan.
2. **Fail-safe `localStorage`**: Jika data pada `localStorage` terhapus, korup, atau tidak valid JSON, sistem wajib otomatis meregenerasi state menggunakan 8 seed product bawaan tanpa membuat antarmuka macet (*crash*).

### 5.4 Aksesibilitas & Responsivitas (Usability & Responsive Design)
1. **Dukungan Layar**: Tata letak responsif menggunakan CSS Grid & Flexbox, nyaman diakses mulai dari layar mobile (360px), tablet (768px), hingga monitor desktop (1280px+).
2. **Touch Targets**: Tombol navigasi, tombol WhatsApp, dan kontrol aksi form memiliki area sentuh minimal 44x44 pixel.
3. **Format Mata Uang Standar**: Menampilkan angka nominal dengan standar mata uang Rupiah Indonesia (`Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })`).

---

## 6. RISIKO DAN MITIGASI (RISKS & MITIGATIONS)

| No | Risiko Teknis / Fungsional | Dampak | Strategi Mitigasi |
| :--- | :--- | :--- | :--- |
| **R-01** | Data `localStorage` korup atau sengaja dimodifikasi dengan JSON tidak valid via developer tools. | Aplikasi mengalami error runtime / blank screen. | Terapkan blok `try...catch` pada pembacaan `localStorage`. Jika parsing gagal atau hasilnya bukan array, inisialisasi ulang otomatis dengan data default. |
| **R-02** | Pengguna memasukkan karakter HTML/JavaScript berbahaya (`<script>alert(1)</script>`) pada formulir produk. | Risiko serangan Stored XSS pada sesi perangkat lokal. | Menggunakan rendering aman berbasis `element.textContent` untuk semua teks dinamis. Atribut seperti `href` dan `src` divalidasi ketat. |
| **R-03** | Gambar aset lokal tidak ditemukan karena perbedaan path atau file terhapus. | Tampilan katalog rusak dengan ikon broken image. | Tambahkan handler `onerror` pada elemen `<img>` yang otomatis mengganti `src` dengan data URI SVG placeholder cokelat lokal. |
| **R-04** | Pengguna salah memasukkan harga negatif atau stok berupa angka desimal. | Inkonsistensi data inventaris dan kebingungan kasir. | Terapkan validasi formulir berlapis (atribut HTML5 `min="0"`, `step="1"`) dan validasi JavaScript sebelum disimpan ke storage. |
| **R-05** | Karakter khusus pada nama produk merusak struktur URL pesan WhatsApp. | Tautan WhatsApp gagal membuka obrolan atau terpotong. | Selalu membungkus parameter pesan menggunakan fungsi bawaan `encodeURIComponent()`. |

---

## 7. OUT-OF-SCOPE (BATASAN RUANG LINGKUP)

Hal-hal berikut ditegaskan berada di **luar lingkup** pengerjaan MVP 1 hari ini:
1. **Sistem Autentikasi / Login**: Tidak ada autentikasi pengguna, tidak ada akun kasir/admin, dan tidak ada sistem login palsu (dummy login).
2. **Backend & Database Server**: Tidak menggunakan Node.js server, Python, PHP, Firebase, Supabase, maupun cloud database lainnya.
3. **Payment Gateway Terintegrasi**: Tidak ada integrasi sistem pembayaran otomatis seperti Midtrans, Xendit, atau QRIS dinamis; pemesanan sepenuhnya dialihkan ke chat WhatsApp manual.
4. **Unggah Berkas Gambar Binary**: Tidak ada fitur upload file biner ke cloud storage; input gambar hanya berupa path relatif lokal atau nama file placeholder.
5. **Multi-Cabang (Multi-Tenant)**: Aplikasi hanya merepresentasikan satu unit gerai, yaitu Cau Chocolates Factory & Restaurant di Marga, Tabanan, Bali.
6. **Ekspedisi & Tracking Pengiriman**: Tidak ada kalkulasi otomatis ongkos kirim (JNE, SiCepat, dll.) maupun pelacakan resi.

---

## 8. ACCEPTANCE CRITERIA (KRITERIA PENERIMAAN MANUAL)

Setiap kriteria di bawah ini harus dapat diuji dan diverifikasi secara manual oleh penguji pada peramban (browser):

### AC-01: Inisialisasi Data & Tampilan Katalog Awal
- **Langkah Uji**: Buka aplikasi pertama kali dengan `localStorage` kosong pada browser.
- **Hasil yang Diharapkan**:
  - Muncul tepat 8 kartu produk bertema Cau Chocolates Bali.
  - Terdapat minimal 1 produk dengan stok 0 (`Organic Raw Cocoa Nibs 200g`).
  - Seluruh harga tertulis dalam format Rupiah baku (contoh: `Rp 45.000`).
  - Produk dengan status `unggulan: true` memiliki lencana/badge "Unggulan" atau penanda visual bintang yang jelas.

### AC-02: Pencarian Real-Time (Search)
- **Langkah Uji**: Ketik kata "ginger" pada kolom pencarian katalog.
- **Hasil yang Diharapkan**:
  - Daftar produk langsung terfilter menampilkan "Cau Dark Chocolate 60% with Bali Ginger".
  - Ketik kata "organik" pada kolom pencarian: produk dengan kata "organik" pada nama atau deskripsi langsung tampil.
  - Hapus teks pencarian: katalog kembali menampilkan seluruh produk.

### AC-03: Filter Kategori
- **Langkah Uji**: Pilih kategori "Dark Chocolate" pada dropdown/filter.
- **Hasil yang Diharapkan**:
  - Hanya produk dengan kategori "Dark Chocolate" yang ditampilkan.
  - Pilih kategori "Semua": seluruh produk kembali ditampilkan.

### AC-04: Pengurutan Produk (Sorting)
- **Langkah Uji**:
  1. Pilih urutan "Harga Terendah ke Tertinggi": produk teratas adalah produk dengan harga terendah (misal Rp 30.000).
  2. Pilih urutan "Harga Tertinggi ke Terendah": produk teratas adalah produk dengan harga tertinggi (misal Rp 55.000).
  3. Pilih urutan "Nama A-Z": produk terurut berdasarkan abjad A ke Z.
  4. Pilih urutan "Unggulan": produk dengan status unggulan berada di urutan teratas.
- **Hasil yang Diharapkan**: Daftar produk tersusun ulang secara instan sesuai kriteria tanpa reload halaman.

### AC-05: Tombol Pemesanan WhatsApp & Validasi Stok Habis
- **Langkah Uji**:
  1. Periksa kartu produk yang memiliki stok > 0: tombol WhatsApp aktif. Klik tombol tersebut -> terbuka tab baru ke `wa.me/6281234567890` yang memuat teks pesanan spesifik produk tersebut dengan konteks Cau Chocolates Bali.
  2. Periksa kartu produk dengan stok = 0 (`Organic Raw Cocoa Nibs 200g`):
- **Hasil yang Diharapkan**:
  - Tombol WhatsApp berstatus `disabled`, bergaya visual nonaktif (abu-abu/muted), dan tidak dapat diklik.
  - Tampil penanda jelas "Stok Habis".

### AC-06: Navigasi Antarmuka (Katalog <-> Dashboard)
- **Langkah Uji**: Klik tombol "Dashboard Pengelola" di bagian header navigasi.
- **Hasil yang Diharapkan**:
  - Tampilan berganti ke mode Dashboard tanpa permintaan login atau kata sandi.
  - Klik tombol "Katalog Belanja": tampilan kembali ke katalog pembeli dengan state sinkron.

### AC-07: Ringkasan Metrik Toko (KPI Dashboard)
- **Langkah Uji**: Buka Dashboard Pengelola dan amati kartu ringkasan di bagian atas.
- **Hasil yang Diharapkan**:
  - `Total Produk` menampilkan angka 8 (pada kondisi awal).
  - `Total Stok` menampilkan jumlah akumulatif stok dari 8 produk.
  - `Stok Habis` menampilkan angka 1 (produk dengan stok 0).
  - `Produk Unggulan` menampilkan jumlah produk bertanda unggulan (misal 3 produk).

### AC-08: Tambah Produk Baru (Create)
- **Langkah Uji**:
  1. Klik tombol "Tambah Produk".
  2. Isi form: Nama = "Cau Cocoa Butter Soap 100g", Kategori = "Kudapan & Cinderamata", Harga = 35000, Stok = 10, Deskripsi = "Sabun mentega kakao alami khas Cau Chocolates", Unggulan = Aktif.
  3. Simpan produk.
- **Hasil yang Diharapkan**:
  - Produk baru muncul di tabel manajemen dan ringkasan Total Produk bertambah 1.
  - Beralih ke Katalog Belanja: produk baru langsung muncul dan dapat dicari serta dipesan.
  - Muat ulang (refresh) halaman peramban: data produk baru tetap ada (persisten di `localStorage`).

### AC-09: Ubah Produk (Update)
- **Langkah Uji**:
  1. Pada Dashboard, pilih satu produk lalu klik tombol "Edit".
  2. Ubah harga menjadi `48000` dan stok menjadi `0`.
  3. Simpan perubahan.
- **Hasil yang Diharapkan**:
  - Data pada tabel dashboard langsung terbarui.
  - Metrik "Stok Habis" bertambah 1.
  - Pada Katalog Belanja, produk terkait berubah harga menjadi Rp 48.000 dan tombol WhatsApp otomatis menjadi nonaktif (`disabled`).

### AC-10: Hapus Produk dengan Konfirmasi (Delete)
- **Langkah Uji**:
  1. Klik tombol "Hapus" pada salah satu baris produk di Dashboard.
  2. Muncul dialog konfirmasi browser ("Apakah Anda yakin ingin menghapus produk ini?").
  3. Klik "Batal": data tidak terhapus.
  4. Klik "Hapus" lagi lalu pilih "OK": produk terhapus dari tabel dan ringkasan metrik berkurang.
- **Hasil yang Diharapkan**: Produk terhapus secara permanen dari `localStorage` dan tidak lagi muncul di katalog.

### AC-11: Reset ke Data Awal
- **Langkah Uji**:
  1. Setelah melakukan tambah/edit/hapus, klik tombol "Reset ke Data Awal".
  2. Konfirmasi tindakan reset pada dialog.
- **Hasil yang Diharapkan**: Seluruh data kembali persis ke 8 produk awal Cau Chocolates Bali.

### AC-12: Fallback Gambar Rusak
- **Langkah Uji**: Tambahkan produk baru dengan path gambar yang sengaja salah (misal: `/assets/products/tidak-ada.jpg`).
- **Hasil yang Diharapkan**: Kartu produk tidak menampilkan ikon gambar rusak, melainkan otomatis menampilkan placeholder SVG bertema kakao yang rapi.

### AC-13: Verifikasi Keamanan Sanitasi Script Injection (XSS Test)
- **Langkah Uji**: Tambahkan produk baru dengan Nama: `<img src=x onerror=alert('XSS-Nama')>` dan Deskripsi: `<script>alert('XSS-Deskripsi')</script>`.
- **Hasil yang Diharapkan**:
  - Tidak ada popup dialog alert yang dieksekusi oleh peramban.
  - Karakter tag HTML ditampilkan secara harfiah sebagai teks murni di layar karena dirender melalui `textContent`.

---

## 9. IMPLEMENTATION PLAN PER ITERASI (1-DAY SPRINT)

Rencana pengerjaan disusun dalam 6 iterasi terstruktur yang dapat diselesaikan dalam rentang waktu 1 hari:

```
+-----------------------------------------------------------------------------------+
|                            1-DAY IMPLEMENTATION SPRINT                            |
+---------------------+--------------------+--------------------+-------------------+
|  Iterasi 1 (0.5h)   |  Iterasi 2 (1.5h)  |  Iterasi 3 (1.0h)  |  Iterasi 4 (1.5h) |
|  Setup & Data Core  |  Storefront UI     |  Search & Filter   |  Admin Dashboard  |
+---------------------+--------------------+--------------------+-------------------+
|  Iterasi 5 (1.5h)   |  Iterasi 6 (1.0h)  |  Total: ~7.0 Jam   |                   |
|  CRUD & Storage     |  QA & Hardening    |  Siap Digunakan    |                   |
+---------------------+--------------------+--------------------+-------------------+
```

### Iterasi 1: Project Setup, Data Seed, & Arsitektur Core (0.5 Jam)
- Menginisialisasi proyek web modern menggunakan Vite + Vanilla JS.
- Menyiapkan struktur folder modular:
  - `src/data/initialProducts.js` (8 seed produk Cau Chocolates Bali).
  - `src/services/storageService.js` (enkapsulasi akses `localStorage` + fail-safe handling).
  - `src/utils/formatters.js` (format mata uang Rupiah dan pembuat URL WhatsApp aman).
  - `src/utils/domUtils.js` (helper perender teks aman / anti-XSS).
  - `public/assets/` (folder aset gambar produk dan fallback SVG placeholder).

### Iterasi 2: Storefront View & Product Cards Rendering (1.5 Jam)
- Membangun layout header toko bertema Cau Chocolates Factory & Restaurant, Bali.
- Mengembangkan komponen kartu produk (nama, kategori, format harga Rp, badge stok, badge unggulan, deskripsi).
- Mengimplementasikan handler fallback gambar otomatis (`img.onerror`).
- Mengimplementasikan tombol pesan WhatsApp terintegrasi URL encoding dan kondisi nonaktif saat stok 0.

### Iterasi 3: Search, Filter, & Sorting Engine (1.0 Jam)
- Membangun antarmuka kontrol pencarian (input search real-time).
- Membuat filter kategori (Dark Chocolate, Milk Chocolate, Bubuk & Biji Kakao, Kudapan & Cinderamata).
- Membuat mekanisme sorting (Unggulan, Harga Naik, Harga Turun, Nama A-Z).
- Menghubungkan state filter dan input event listener dengan rendering ulang katalog tanpa reload.

### Iterasi 4: Dashboard UI & Inventory Metrics (1.5 Jam)
- Membuat navigasi switcher antara mode "Katalog Belanja" dan "Dashboard Pengelola".
- Membangun kartu metrik inventaris (Total Produk, Total Stok, Stok Habis, Produk Unggulan).
- Membangun komponen tabel inventaris produk (Read mode) dengan indikator visual stok 0.

### Iterasi 5: Full CRUD Operations & Reset Logic (1.5 Jam)
- Membangun modal/form interaktif untuk "Tambah Produk" dan "Edit Produk" lengkap dengan validasi tipe data (harga non-negatif, stok integer).
- Mengimplementasikan fungsi hapus produk dengan dialog konfirmasi eksplisit.
- Mengimplementasikan fungsi "Reset ke Data Awal" yang mengembalikan state ke seed data.
- Menjamin sinkronisasi dua arah seketika antara perubahan di dashboard dengan tampilan katalog pembeli.

### Iterasi 6: Security Hardening, Responsive Polish, & Manual Acceptance Testing (1.0 Jam)
- Pengujian keamanan injeksi skrip (XSS) pada seluruh field formulir.
- Pengujian responsivitas pada resolusi mobile, tablet, dan desktop.
- Menjalankan seluruh skenario pengujian manual sesuai bab **Acceptance Criteria (AC-01 s.d. AC-13)**.
- Finalisasi dokumentasi dan persiapan demonstrasi aplikasi.

---

### Verifikasi Kepatuhan Batasan
- [x] Tanpa penyimpanan API key atau rahasia apapun.
- [x] Data contoh murni nonpribadi bertema Cau Chocolates Bali.
- [x] Rendering DOM dirancang aman via `textContent` / sanitasi untuk mencegah XSS.
- [x] Bebas dari login palsu dan tanpa backend.
- [x] Kriteria penerimaan terdefinisi jelas untuk pengujian manual.
- [x] **Tidak ada penulisan kode aplikasi pada tahap ini.**
