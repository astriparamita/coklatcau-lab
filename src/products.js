export const STORE_INFO = {
  name: 'Cau Chocolates Bali',
  subtitle: 'Cau Chocolates Factory & Restaurant',
  address: 'Jl. Raya Marga-Apuan, Cau, Kec. Marga, Kabupaten Tabanan, Bali',
  whatsappNumber: '6281234567890'
};

export const CATEGORIES = [
  'Dark Chocolate',
  'Milk Chocolate',
  'Bubuk & Biji Kakao',
  'Kudapan & Cinderamata'
];

export const FALLBACK_IMAGE_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
      <rect width="400" height="260" fill="#F3ECE1"/>
      <rect x="16" y="16" width="368" height="228" rx="14" fill="#E6DAC8" stroke="#2D4F3E" stroke-width="2" stroke-dasharray="6 6"/>
      <g transform="translate(200, 108)" fill="#2D4F3E">
        <ellipse cx="0" cy="0" rx="26" ry="38" fill="#4A3222"/>
        <path d="M-8 -30 Q0 0 -8 30 M0 -36 L0 36 M8 -30 Q0 0 8 30" stroke="#F3ECE1" stroke-width="2.5" fill="none"/>
      </g>
      <text x="200" y="175" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#233329">
        Cau Chocolates Bali
      </text>
      <text x="200" y="196" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#4E5D52">
        Olahan Kakao Organik Tabanan
      </text>
    </svg>
  `);

export const INITIAL_PRODUCTS = [
  {
    id: 'cau-prod-001',
    nama: 'Cau Organic Dark Chocolate 80%',
    kategori: 'Dark Chocolate',
    harga: 45000,
    stok: 15,
    deskripsi:
      'Cokelat hitam organik murni dari biji kakao fermentasi khas Marga, Tabanan dengan cita rasa pekat dan sedikit rasa buah tropis.',
    imageUrl: '/assets/products/cau-dark-80.jpg',
    unggulan: true
  },
  {
    id: 'cau-prod-002',
    nama: 'Cau Tabanan Heritage Milk Chocolate',
    kategori: 'Milk Chocolate',
    harga: 40000,
    stok: 20,
    deskripsi:
      'Cokelat susu lembut berpadu dengan susu murni lokal Bali, menciptakan tekstur lumer dan manis pas di lidah.',
    imageUrl: '/assets/products/cau-milk-heritage.jpg',
    unggulan: true
  },
  {
    id: 'cau-prod-003',
    nama: 'Cau Pure Organic Cocoa Powder 250g',
    kategori: 'Bubuk & Biji Kakao',
    harga: 55000,
    stok: 12,
    deskripsi:
      'Bubuk kakao murni tanpa pemanis tambahan, ideal untuk minuman hangat, adonan kue, atau smoothie sehat harian.',
    imageUrl: '/assets/products/cau-cocoa-powder.jpg',
    unggulan: false
  },
  {
    id: 'cau-prod-004',
    nama: 'Roasted Cocoa Beans with Sea Salt',
    kategori: 'Kudapan & Cinderamata',
    harga: 35000,
    stok: 18,
    deskripsi:
      'Biji kakao sangrai pilihan bertabur garam laut tradisional Kusamba Bali, cemilan kaya antioksidan dan renyah.',
    imageUrl: '/assets/products/cau-roasted-beans.jpg',
    unggulan: false
  },
  {
    id: 'cau-prod-005',
    nama: 'Cau Dark Chocolate 60% with Bali Ginger',
    kategori: 'Dark Chocolate',
    harga: 45000,
    stok: 8,
    deskripsi:
      'Kombinasi eksotis cokelat hitam 60% dengan sensasi hangat jahe merah Bali asli perkebunan Tabanan.',
    imageUrl: '/assets/products/cau-dark-ginger.jpg',
    unggulan: true
  },
  {
    id: 'cau-prod-006',
    nama: 'Organic Raw Cocoa Nibs 200g',
    kategori: 'Bubuk & Biji Kakao',
    harga: 50000,
    stok: 0,
    deskripsi:
      'Pecahan biji kakao mentah organik kaya magnesium dan serat. (Stok habis / menunggu masa panen baru).',
    imageUrl: '/assets/products/cau-cocoa-nibs.jpg',
    unggulan: false
  },
  {
    id: 'cau-prod-007',
    nama: 'Cau Balinese Cocoa Tea Husk 100g',
    kategori: 'Kudapan & Cinderamata',
    harga: 30000,
    stok: 25,
    deskripsi:
      'Teh herbal aromatik yang diseduh dari kulit biji kakao pilihan dengan aroma cokelat alami yang menenangkan tanpa kafein tinggi.',
    imageUrl: '/assets/products/cau-cocoa-tea.jpg',
    unggulan: false
  },
  {
    id: 'cau-prod-008',
    nama: 'Cau Artisan Coffee Cocoa Bar 55%',
    kategori: 'Dark Chocolate',
    harga: 42000,
    stok: 10,
    deskripsi:
      'Paduan istimewa kakao organik Cau dan biji kopi Robusta Pupuan Tabanan dengan aroma harum dan rasa seimbang.',
    imageUrl: '/assets/products/cau-coffee-bar.jpg',
    unggulan: false
  }
];
