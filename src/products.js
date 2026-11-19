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

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function createProductSvgDataUri(title, category, accentHex = '#4A3222') {
  const safeTitle = escapeXml(String(title).slice(0, 32));
  const safeCat = escapeXml(String(category).slice(0, 30));

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
      <rect width="480" height="300" fill="#F3ECE1"/>
      <rect x="16" y="16" width="448" height="268" rx="16" fill="#FAF6F0" stroke="#2D4F3E" stroke-width="2" stroke-dasharray="6 5"/>
      <rect x="165" y="38" width="150" height="24" rx="12" fill="#2D4F3E"/>
      <text x="240" y="54" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">
        Cau Chocolates Bali
      </text>
      <circle cx="240" cy="122" r="38" fill="${accentHex}" opacity="0.14"/>
      <ellipse cx="240" cy="122" rx="22" ry="34" fill="${accentHex}"/>
      <path d="M232 95 Q240 122 232 149 M240 89 L240 155 M248 95 Q240 122 248 149" stroke="#FAF6F0" stroke-width="2.2" fill="none"/>
      <text x="240" y="188" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#1E2923">
        ${safeTitle}
      </text>
      <text x="240" y="212" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="600" fill="#2D4F3E">
        ${safeCat}
      </text>
      <text x="240" y="246" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#4A584F">
        Kakao Organik Marga · Tabanan, Bali
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const FALLBACK_IMAGE_SVG = createProductSvgDataUri(
  'Cau Chocolates Bali',
  'Olahan Kakao Organik',
  '#4A3222'
);

export const INITIAL_PRODUCTS = [
  {
    id: 'cau-prod-001',
    nama: 'Cau Organic Dark Chocolate 80%',
    kategori: 'Dark Chocolate',
    harga: 45000,
    stok: 15,
    deskripsi:
      'Cokelat hitam organik murni dari biji kakao fermentasi khas Marga, Tabanan dengan cita rasa pekat dan sentuhan buah tropis.',
    imageUrl: createProductSvgDataUri('Dark Chocolate 80%', 'Dark Chocolate', '#3B2314'),
    unggulan: true
  },
  {
    id: 'cau-prod-002',
    nama: 'Cau Tabanan Heritage Milk Chocolate',
    kategori: 'Milk Chocolate',
    harga: 40000,
    stok: 20,
    deskripsi:
      'Cokelat susu lembut berpadu dengan susu murni lokal Bali, menciptakan tekstur lumer dan manis seimbang di lidah.',
    imageUrl: createProductSvgDataUri('Heritage Milk Chocolate', 'Milk Chocolate', '#6E472B'),
    unggulan: true
  },
  {
    id: 'cau-prod-003',
    nama: 'Cau Pure Organic Cocoa Powder 250g',
    kategori: 'Bubuk & Biji Kakao',
    harga: 55000,
    stok: 12,
    deskripsi:
      'Bubuk kakao murni tanpa pemanis tambahan, ideal untuk seduhan cokelat hangat, adonan kue, maupun smoothie harian.',
    imageUrl: createProductSvgDataUri('Pure Cocoa Powder 250g', 'Bubuk & Biji Kakao', '#543521'),
    unggulan: false
  },
  {
    id: 'cau-prod-004',
    nama: 'Roasted Cocoa Beans with Sea Salt',
    kategori: 'Kudapan & Cinderamata',
    harga: 35000,
    stok: 18,
    deskripsi:
      'Biji kakao sangrai pilihan bertabur garam laut tradisional Kusamba Bali, camilan renyah kaya antioksidan.',
    imageUrl: createProductSvgDataUri('Roasted Cocoa & Sea Salt', 'Kudapan & Cinderamata', '#2D4F3E'),
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
    imageUrl: createProductSvgDataUri('Dark 60% Bali Ginger', 'Dark Chocolate', '#4A3222'),
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
    imageUrl: createProductSvgDataUri('Raw Cocoa Nibs 200g', 'Bubuk & Biji Kakao', '#5C4033'),
    unggulan: false
  },
  {
    id: 'cau-prod-007',
    nama: 'Cau Balinese Cocoa Tea Husk 100g',
    kategori: 'Kudapan & Cinderamata',
    harga: 30000,
    stok: 25,
    deskripsi:
      'Teh herbal aromatik dari kulit biji kakao pilihan dengan aroma cokelat alami yang menenangkan tanpa kafein tinggi.',
    imageUrl: createProductSvgDataUri('Balinese Cocoa Tea 100g', 'Kudapan & Cinderamata', '#2D4F3E'),
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
    imageUrl: createProductSvgDataUri('Artisan Coffee Bar 55%', 'Dark Chocolate', '#3E2723'),
    unggulan: false
  }
];