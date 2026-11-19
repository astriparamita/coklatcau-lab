import { CATEGORIES, FALLBACK_IMAGE_SVG, STORE_INFO } from './products.js';

export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

export function normalizeInternationalPhone(rawPhone) {
  const digitsOnly = String(rawPhone ?? '').replace(/\D/g, '');
  return /^[1-9]\d{7,14}$/.test(digitsOnly) ? digitsOnly : '';
}

export function buildWhatsAppUrl(nomor, produk) {
  const validPhone = normalizeInternationalPhone(nomor);
  if (!validPhone || !produk) return '#';

  const message = [
    'Halo Admin Cau Chocolates Bali!',
    'Saya ingin memesan produk olahan kakao berikut:',
    `- Produk: ${produk.nama}`,
    `- Harga: ${formatRupiah(produk.harga)}`,
    `- Asal Gerai: ${STORE_INFO.subtitle}, Tabanan, Bali`,
    '',
    'Mohon info ketersediaan dan ongkos kirim. Terima kasih!'
  ].join('\n');

  return `https://wa.me/${validPhone}?text=${encodeURIComponent(message)}`;
}

function createShowcaseBannerSvg() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1120" height="420" viewBox="0 0 1120 420">
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F5EFE6"/>
          <stop offset="100%" stop-color="#E8DEC9"/>
        </linearGradient>
        <linearGradient id="tableGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#B98350"/>
          <stop offset="100%" stop-color="#8C582B"/>
        </linearGradient>
      </defs>
      <!-- Latar Dinding & Meja Kayu -->
      <rect width="1120" height="315" fill="url(#wallGrad)"/>
      <rect y="315" width="1120" height="105" fill="url(#tableGrad)"/>
      <line x1="0" y1="315" x2="1120" y2="315" stroke="#73451E" stroke-width="3"/>

      <!-- Layar Katalog / Tablet di Kiri -->
      <rect x="74" y="138" width="236" height="156" rx="10" fill="#233329"/>
      <rect x="84" y="148" width="216" height="134" rx="4" fill="#FAF6F0"/>
      <rect x="84" y="148" width="216" height="22" fill="#2D4F3E"/>
      <rect x="96" y="180" width="88" height="46" rx="6" fill="#E6DAC8"/>
      <rect x="194" y="180" width="94" height="12" rx="3" fill="#2D4F3E"/>
      <rect x="194" y="198" width="76" height="8" rx="3" fill="#8A5A19"/>
      <rect x="194" y="212" width="84" height="8" rx="3" fill="#B6A895"/>
      <rect x="96" y="238" width="192" height="32" rx="6" fill="#F3ECE1" stroke="#DFD4C3"/>
      <path d="M56 294 L328 294 L314 314 L70 314 Z" fill="#D5D2CC"/>

      <!-- Pouch Putih Besar (Cocoa Powder) -->
      <rect x="348" y="106" width="138" height="214" rx="16" fill="#FFFFFF" stroke="#DFD4C3" stroke-width="2"/>
      <rect x="366" y="148" width="102" height="34" rx="6" fill="#2D4F3E"/>
      <text x="417" y="169" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">CAU COCOA</text>
      <rect x="366" y="192" width="102" height="86" rx="8" fill="#F3ECE1"/>
      <ellipse cx="417" cy="235" rx="20" ry="28" fill="#4A3222"/>

      <!-- Tanaman Kakao / Sukulen Mini -->
      <rect x="506" y="248" width="66" height="72" rx="10" fill="#233329"/>
      <path d="M539 248 C520 220, 508 198, 522 184 C532 198, 536 222, 539 248 Z" fill="#2D4F3E"/>
      <path d="M539 248 C535 212, 538 182, 546 172 C552 188, 548 218, 539 248 Z" fill="#3E6B54"/>
      <path d="M539 248 C556 218, 572 198, 560 184 C548 196, 544 222, 539 248 Z" fill="#2D4F3E"/>

      <!-- 4 Kemasan Kraft Cokelat Artisan di Kanan -->
      <g transform="translate(596, 134)">
        <rect width="106" height="186" rx="12" fill="#D7B48A" stroke="#B68E60" stroke-width="2"/>
        <rect x="14" y="34" width="78" height="26" rx="5" fill="#2D4F3E"/>
        <text x="53" y="51" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#FFFFFF">DARK 80%</text>
        <rect x="14" y="70" width="78" height="82" rx="6" fill="#FAF6F0"/>
        <ellipse cx="53" cy="111" rx="16" ry="23" fill="#3B2314"/>
      </g>

      <g transform="translate(714, 146)">
        <rect width="104" height="178" rx="12" fill="#DFC099" stroke="#B68E60" stroke-width="2"/>
        <rect x="13" y="32" width="78" height="26" rx="5" fill="#4A3222"/>
        <text x="52" y="49" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#FFFFFF">MILK CHOC</text>
        <rect x="13" y="68" width="78" height="78" rx="6" fill="#FAF6F0"/>
        <ellipse cx="52" cy="107" rx="16" ry="22" fill="#6E472B"/>
      </g>

      <g transform="translate(830, 136)">
        <rect width="106" height="186" rx="12" fill="#D2AC7E" stroke="#B68E60" stroke-width="2"/>
        <rect x="14" y="34" width="78" height="26" rx="5" fill="#2D4F3E"/>
        <text x="53" y="51" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#FFFFFF">BALI GINGER</text>
        <rect x="14" y="70" width="78" height="82" rx="6" fill="#FAF6F0"/>
        <ellipse cx="53" cy="111" rx="16" ry="23" fill="#4A3222"/>
      </g>

      <g transform="translate(948, 152)">
        <rect width="98" height="172" rx="12" fill="#DCBC94" stroke="#B68E60" stroke-width="2"/>
        <rect x="12" y="30" width="74" height="24" rx="5" fill="#8A5A19"/>
        <text x="49" y="46" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">COCOA TEA</text>
        <rect x="12" y="64" width="74" height="76" rx="6" fill="#FAF6F0"/>
        <ellipse cx="49" cy="102" rx="15" ry="21" fill="#2D4F3E"/>
      </g>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== false) {
        node.setAttribute(key, value === true ? '' : String(value));
      }
    });
  }
  children.forEach((child) => {
    if (child) node.appendChild(child);
  });
  return node;
}

export function renderApp(root, store) {
  root.replaceChildren();

  const header = renderNavbar(store);
  const main = el('main', { className: 'container main-content' });

  if (store.viewMode === 'info') {
    main.appendChild(renderInfoDashboard(store));
  } else if (store.viewMode === 'catalog') {
    main.appendChild(renderHero(store));
    main.appendChild(renderToolbar(store));
    main.appendChild(renderProductGrid(store));
  } else {
    main.appendChild(renderDashboard(store));
  }

  const footer = el('footer', { className: 'site-footer' }, [
    el('div', { className: 'container footer-inner' }, [
      el('p', {
        className: 'footer-brand',
        text: `${STORE_INFO.subtitle} — ${STORE_INFO.address}`
      }),
      el('p', {
        className: 'footer-note',
        text: 'Katalog Digital UMKM • Data tersimpan lokal di peramban Anda'
      })
    ])
  ]);

  root.appendChild(header);
  root.appendChild(main);
  root.appendChild(footer);
}

function renderNavbar(store) {
  const brandTitle = el('div', { className: 'brand-info' }, [
    el('span', { className: 'brand-badge-icon', text: '🌿' }),
    el('div', {}, [
      el('span', { className: 'brand-title', text: STORE_INFO.name }),
      el('span', {
        className: 'brand-subtitle',
        text: 'Marga, Tabanan · Bali'
      })
    ])
  ]);

  const infoLink = el('button', {
    className: `nav-link-item ${store.viewMode === 'info' ? 'active' : ''}`,
    text: 'Beranda & Info',
    attrs: {
      type: 'button',
      'aria-pressed': store.viewMode === 'info'
    }
  });
  infoLink.addEventListener('click', () => store.setViewMode('info'));

  const catalogLink = el('button', {
    className: `nav-link-item ${store.viewMode === 'catalog' ? 'active' : ''}`,
    text: 'Katalog Produk',
    attrs: {
      type: 'button',
      'aria-pressed': store.viewMode === 'catalog'
    }
  });
  catalogLink.addEventListener('click', () => store.setViewMode('catalog'));

  const dashboardBtn = el('button', {
    className: `nav-cta-outline ${store.viewMode === 'dashboard' ? 'active' : ''}`,
    text: 'Dashboard Demo',
    attrs: {
      type: 'button',
      'aria-pressed': store.viewMode === 'dashboard'
    }
  });
  dashboardBtn.addEventListener('click', () => store.setViewMode('dashboard'));

  return el('header', { className: 'navbar' }, [
    el('div', { className: 'container navbar-inner' }, [
      brandTitle,
      el('nav', { className: 'nav-center-links', attrs: { 'aria-label': 'Navigasi Utama' } }, [
        infoLink,
        catalogLink
      ]),
      el('div', { className: 'nav-right-action' }, [dashboardBtn])
    ])
  ]);
}

function renderInfoDashboard(store) {
  const metrics = store.getMetrics();
  const featuredProducts = store.products.filter((p) => p.unggulan).slice(0, 3);

  const bannerImg = el('img', {
    className: 'showcase-banner-img',
    attrs: {
      src: createShowcaseBannerSvg(),
      alt: 'Etalase produk cokelat organik Cau Chocolates Bali di atas meja kayu'
    }
  });

  const bannerCta = el('button', {
    className: 'showcase-floating-cta',
    text: 'Lihat Katalog Lengkap',
    attrs: { type: 'button' }
  });
  bannerCta.addEventListener('click', () => store.setViewMode('catalog'));

  const showcaseSection = el('section', {
    className: 'showcase-wrapper',
    attrs: { 'aria-labelledby': 'showcase-heading' }
  }, [
    el('div', { className: 'showcase-media-box' }, [bannerImg, bannerCta]),
    el('div', { className: 'showcase-three-col' }, [
      // Kolom Kiri: Judul Utama & Profil Singkat
      el('div', { className: 'showcase-col-left' }, [
        el('h1', {
          className: 'showcase-main-title',
          text: 'Cokelat Organik & Agrowisata Tabanan',
          attrs: { id: 'showcase-heading' }
        }),
        el('p', {
          className: 'showcase-body-text',
          text: 'Cau Chocolates Factory & Restaurant mengolah biji kakao fermentasi pilihan dari perkebunan lokal Desa Cau, Marga, Tabanan menjadi cokelat artisan berkualitas tinggi.'
        })
      ]),

      // Kolom Tengah: Kotak Ringkasan Stok & Tombol CTA Utama
      el('div', { className: 'showcase-col-center' }, [
        el('div', { className: 'summary-stats-box' }, [
          el('div', { className: 'summary-box-title', text: 'Ringkasan Katalog Gerai' }),
          el('div', { className: 'summary-stats-grid' }, [
            el('div', { className: 'stat-pair' }, [
              el('span', { className: 'stat-name', text: 'Varian Produk' }),
              el('strong', { className: 'stat-val', text: `${metrics.totalProduk} Item` })
            ]),
            el('div', { className: 'stat-pair' }, [
              el('span', { className: 'stat-name', text: 'Total Stok' }),
              el('strong', { className: 'stat-val', text: `${metrics.totalStok} Unit` })
            ]),
            el('div', { className: 'stat-pair' }, [
              el('span', { className: 'stat-name', text: 'Unggulan' }),
              el('strong', { className: 'stat-val', text: `${metrics.produkUnggulan} Produk` })
            ]),
            el('div', { className: 'stat-pair' }, [
              el('span', { className: 'stat-name', text: 'Stok Habis' }),
              el('strong', {
                className: `stat-val ${metrics.stokHabis > 0 ? 'text-danger' : ''}`,
                text: `${metrics.stokHabis} Varian`
              })
            ])
          ])
        ]),
        (() => {
          const pillCta = el('button', {
            className: 'btn btn-primary btn-pill-cta',
            text: 'Buka Katalog Belanja',
            attrs: { type: 'button' }
          });
          pillCta.addEventListener('click', () => store.setViewMode('catalog'));
          return pillCta;
        })()
      ]),

      // Kolom Kanan: Info Lokasi, Jam Buka & Pemesanan WhatsApp
      el('div', { className: 'showcase-col-right' }, [
        el('p', {
          className: 'showcase-body-text',
          text: `${STORE_INFO.address}. Buka setiap hari pukul 09.00 – 17.00 WITA untuk wisata edukasi kakao, restoran organik, dan pemesanan langsung melalui WhatsApp gerai.`
        }),
        (() => {
          const manageLink = el('button', {
            className: 'btn btn-secondary btn-sm-full',
            text: 'Kelola Inventaris (Dashboard Demo)',
            attrs: { type: 'button' }
          });
          manageLink.addEventListener('click', () => store.setViewMode('dashboard'));
          return manageLink;
        })()
      ])
    ])
  ]);

  const previewHeader = el('div', { className: 'dashboard-header' }, [
    el('div', {}, [
      el('h2', { className: 'dashboard-title', text: 'Produk Unggulan Cau Chocolates Bali' }),
      el('p', {
        className: 'dashboard-subtitle',
        text: 'Pilihan favorit wisatawan yang dapat langsung dipesan via WhatsApp.'
      })
    ]),
    (() => {
      const allBtn = el('button', {
        className: 'btn btn-secondary',
        text: `Lihat Semua (${store.products.length} Produk) →`,
        attrs: { type: 'button' }
      });
      allBtn.addEventListener('click', () => store.setViewMode('catalog'));
      return allBtn;
    })()
  ]);

  const previewGrid = el('div', { className: 'product-grid' });
  featuredProducts.forEach((product) => previewGrid.appendChild(renderProductCard(product)));

  return el('div', { className: 'info-dashboard-wrapper' }, [
    showcaseSection,
    el('section', { className: 'featured-preview-section' }, [previewHeader, previewGrid])
  ]);
}

function renderHero(store) {
  const scrollBtn = el('button', {
    className: 'btn btn-primary',
    text: 'Lihat Katalog',
    attrs: { type: 'button' }
  });
  scrollBtn.addEventListener('click', () => {
    document.getElementById('katalog-produk')?.scrollIntoView({ behavior: 'smooth' });
  });

  const manageBtn = el('button', {
    className: 'btn btn-secondary',
    text: 'Kelola Stok',
    attrs: { type: 'button' }
  });
  manageBtn.addEventListener('click', () => store.setViewMode('dashboard'));

  return el('section', { className: 'hero-banner', attrs: { 'aria-labelledby': 'hero-heading' } }, [
    el('span', { className: 'hero-eyebrow', text: 'Agrowisata & Produsen Kakao Organik Bali' }),
    el('h1', {
      className: 'hero-title',
      text: 'Cokelat Artisan & Olahan Kakao Murni dari Tabanan',
      attrs: { id: 'hero-heading' }
    }),
    el('p', {
      className: 'hero-desc',
      text: 'Jelajahi koleksi dark chocolate, milk chocolate, bubuk kakao organik, dan kudapan khas Cau Chocolates Bali. Pesan langsung melalui WhatsApp gerai kami.'
    }),
    el('div', { className: 'hero-actions' }, [scrollBtn, manageBtn])
  ]);
}

function renderToolbar(store) {
  const searchInput = el('input', {
    className: 'control-input',
    attrs: {
      type: 'search',
      id: 'search-input',
      placeholder: 'Cari nama atau deskripsi cokelat...',
      value: store.filters.search,
      'aria-label': 'Cari produk cokelat'
    }
  });
  searchInput.addEventListener('input', (e) => {
    const cursor = e.target.selectionStart;
    store.setFilter({ search: e.target.value });
    const nextInput = document.getElementById('search-input');
    if (nextInput) {
      nextInput.focus();
      nextInput.setSelectionRange(cursor, cursor);
    }
  });

  const categorySelect = el('select', {
    className: 'control-select',
    attrs: { id: 'category-select', 'aria-label': 'Filter kategori produk' }
  });
  ['Semua', ...CATEGORIES].forEach((cat) => {
    const opt = el('option', {
      text: cat === 'Semua' ? 'Kategori: Semua' : cat,
      attrs: { value: cat, selected: store.filters.kategori === cat }
    });
    categorySelect.appendChild(opt);
  });
  categorySelect.addEventListener('change', (e) => {
    store.setFilter({ kategori: e.target.value });
  });

  const sortSelect = el('select', {
    className: 'control-select',
    attrs: { id: 'sort-select', 'aria-label': 'Urutkan produk' }
  });
  const sortOptions = [
    { value: 'unggulan', label: 'Urutkan: Unggulan' },
    { value: 'harga-asc', label: 'Harga: Terendah ke Tertinggi' },
    { value: 'harga-desc', label: 'Harga: Tertinggi ke Terendah' },
    { value: 'nama-asc', label: 'Nama: A - Z' }
  ];
  sortOptions.forEach((item) => {
    const opt = el('option', {
      text: item.label,
      attrs: { value: item.value, selected: store.filters.sort === item.value }
    });
    sortSelect.appendChild(opt);
  });
  sortSelect.addEventListener('change', (e) => {
    store.setFilter({ sort: e.target.value });
  });

  return el('section', { className: 'toolbar', attrs: { 'aria-label': 'Pencarian dan Filter' } }, [
    searchInput,
    categorySelect,
    sortSelect
  ]);
}

function renderProductGrid(store) {
  const products = store.getFilteredProducts();
  const totalAll = store.products.length;
  const hasActiveFilter =
    store.filters.search.trim() !== '' || store.filters.kategori !== 'Semua';

  const section = el('section', {
    className: 'catalog-section',
    attrs: { id: 'katalog-produk', 'aria-label': 'Daftar Produk Katalog' }
  });

  const statusRow = el('div', {
    className: 'catalog-status',
    attrs: { 'aria-live': 'polite' }
  }, [
    el('p', {
      className: 'catalog-count',
      text: `Menampilkan ${products.length} dari ${totalAll} produk Cau Chocolates Bali`
    })
  ]);

  if (hasActiveFilter) {
    const clearBtn = el('button', {
      className: 'btn btn-secondary',
      text: 'Reset Filter',
      attrs: { type: 'button' }
    });
    clearBtn.addEventListener('click', () => store.resetFilters());
    statusRow.appendChild(clearBtn);
  }

  section.appendChild(statusRow);

  if (products.length === 0) {
    const resetFilterBtn = el('button', {
      className: 'btn btn-primary',
      text: 'Tampilkan Semua Produk',
      attrs: { type: 'button' }
    });
    resetFilterBtn.addEventListener('click', () => store.resetFilters());

    section.appendChild(
      el('div', { className: 'empty-state', attrs: { role: 'status' } }, [
        el('h2', {
          className: 'empty-title',
          text: 'Produk Cokelat Tidak Ditemukan'
        }),
        el('p', {
          text: 'Tidak ada varian produk yang cocok dengan kata kunci atau kategori yang dipilih.'
        }),
        resetFilterBtn
      ])
    );
    return section;
  }

  const grid = el('div', { className: 'product-grid' });
  products.forEach((product) => {
    grid.appendChild(renderProductCard(product));
  });

  section.appendChild(grid);
  return section;
}

function renderProductCard(product) {
  const isOutOfStock = product.stok <= 0;

  const img = el('img', {
    className: 'card-image',
    attrs: {
      src: product.imageUrl,
      alt: product.nama,
      loading: 'lazy'
    }
  });
  img.addEventListener('error', () => {
    if (!img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = '1';
      img.src = FALLBACK_IMAGE_SVG;
    }
  });

  const badges = el('div', { className: 'card-badges' });
  if (product.unggulan) {
    badges.appendChild(el('span', { className: 'badge badge-featured', text: '★ Unggulan' }));
  }
  badges.appendChild(
    el('span', {
      className: `badge ${isOutOfStock ? 'badge-out' : 'badge-stock'}`,
      text: isOutOfStock ? 'Stok Habis' : `Stok: ${product.stok}`
    })
  );

  let actionControl;
  if (isOutOfStock) {
    actionControl = el('button', {
      className: 'btn btn-wa btn-disabled',
      text: 'Stok Habis',
      attrs: { type: 'button', disabled: true, 'aria-disabled': 'true' }
    });
  } else {
    actionControl = el('a', {
      className: 'btn btn-wa',
      text: 'Pesan via WhatsApp',
      attrs: {
        href: buildWhatsAppUrl(STORE_INFO.whatsappNumber, product),
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `Pesan ${product.nama} via WhatsApp`
      }
    });
  }

  return el('article', { className: `product-card ${isOutOfStock ? 'is-out-of-stock' : ''}` }, [
    el('div', { className: 'card-media' }, [img, badges]),
    el('div', { className: 'card-body' }, [
      el('span', { className: 'card-category', text: product.kategori }),
      el('h2', { className: 'card-title', text: product.nama }),
      el('p', { className: 'card-desc', text: product.deskripsi }),
      el('div', { className: 'card-footer' }, [
        el('span', { className: 'card-price', text: formatRupiah(product.harga) }),
        actionControl
      ])
    ])
  ]);
}

function renderDashboard(store) {
  const metrics = store.getMetrics();
  const wrapper = el('section', {
    className: 'dashboard-section',
    attrs: { 'aria-labelledby': 'dashboard-heading' }
  });

  const resetSeedBtn = el('button', {
    className: 'btn btn-danger-outline',
    text: 'Reset ke Data Awal',
    attrs: { type: 'button' }
  });
  resetSeedBtn.addEventListener('click', () => {
    if (window.confirm('Kembalikan seluruh data produk ke 8 produk awal Cau Chocolates Bali?')) {
      store.resetProducts();
    }
  });

  const topHeader = el('div', { className: 'dashboard-header' }, [
    el('div', {}, [
      el('h1', {
        className: 'dashboard-title',
        text: 'Dashboard Pengelola Inventaris',
        attrs: { id: 'dashboard-heading' }
      }),
      el('p', {
        className: 'dashboard-subtitle',
        text: 'Kelola variasi cokelat, perbarui stok gerai, dan pantau ketersediaan produk secara real-time.'
      })
    ]),
    resetSeedBtn
  ]);

  const kpiGrid = el('div', { className: 'kpi-grid' }, [
    renderKpiCard('Total Produk', metrics.totalProduk, 'Varian terdaftar'),
    renderKpiCard('Total Stok', metrics.totalStok, 'Unit siap jual'),
    renderKpiCard('Stok Habis', metrics.stokHabis, 'Perlu restock', metrics.stokHabis > 0),
    renderKpiCard('Produk Unggulan', metrics.produkUnggulan, 'Rekomendasi utama')
  ]);

  const workspace = el('div', { className: 'dashboard-workspace' }, [
    renderProductForm(store),
    renderInventoryTable(store)
  ]);

  wrapper.appendChild(topHeader);
  wrapper.appendChild(kpiGrid);
  wrapper.appendChild(workspace);
  return wrapper;
}

function renderKpiCard(label, value, hint, alert = false) {
  return el('div', { className: `kpi-card ${alert ? 'kpi-alert' : ''}` }, [
    el('span', { className: 'kpi-label', text: label }),
    el('strong', { className: 'kpi-value', text: String(value) }),
    el('span', { className: 'kpi-hint', text: hint })
  ]);
}

function renderProductForm(store) {
  const editingProduct = store.editingProductId
    ? store.products.find((p) => p.id === store.editingProductId)
    : null;

  const errorBox = el('div', {
    className: 'form-errors',
    attrs: { role: 'alert', hidden: true }
  });

  const nameInput = el('input', {
    className: 'form-input',
    attrs: {
      type: 'text',
      id: 'prod-nama',
      required: true,
      minlength: 3,
      placeholder: 'Contoh: Cau Dark Chocolate 75%',
      value: editingProduct ? editingProduct.nama : ''
    }
  });

  const catSelect = el('select', {
    className: 'form-input',
    attrs: { id: 'prod-kategori', required: true }
  });
  CATEGORIES.forEach((cat) => {
    catSelect.appendChild(
      el('option', {
        text: cat,
        attrs: { value: cat, selected: editingProduct?.kategori === cat }
      })
    );
  });

  const priceInput = el('input', {
    className: 'form-input',
    attrs: {
      type: 'number',
      id: 'prod-harga',
      required: true,
      min: 0,
      step: 500,
      placeholder: '45000',
      value: editingProduct ? editingProduct.harga : ''
    }
  });

  const stockInput = el('input', {
    className: 'form-input',
    attrs: {
      type: 'number',
      id: 'prod-stok',
      required: true,
      min: 0,
      step: 1,
      placeholder: '10',
      value: editingProduct ? editingProduct.stok : ''
    }
  });

  const imageInput = el('input', {
    className: 'form-input',
    attrs: {
      type: 'text',
      id: 'prod-image',
      placeholder: '/assets/products/cau-dark-80.jpg',
      value: editingProduct ? editingProduct.imageUrl : '/assets/products/cau-dark-80.jpg'
    }
  });

  const descInput = el('textarea', {
    className: 'form-input form-textarea',
    text: editingProduct ? editingProduct.deskripsi : '',
    attrs: {
      id: 'prod-deskripsi',
      rows: 3,
      placeholder: 'Deskripsi singkat rasa dan komposisi produk...'
    }
  });

  const featuredCheckbox = el('input', {
    attrs: {
      type: 'checkbox',
      id: 'prod-unggulan',
      checked: editingProduct ? editingProduct.unggulan : false
    }
  });

  const submitBtn = el('button', {
    className: 'btn btn-primary',
    text: editingProduct ? 'Simpan Perubahan' : 'Tambah Produk',
    attrs: { type: 'submit' }
  });

  const actions = [submitBtn];
  if (editingProduct) {
    const cancelBtn = el('button', {
      className: 'btn btn-secondary',
      text: 'Batal Edit',
      attrs: { type: 'button' }
    });
    cancelBtn.addEventListener('click', () => store.cancelEdit());
    actions.push(cancelBtn);
  }

  const form = el('form', { className: 'product-form-card' }, [
    el('h2', {
      className: 'panel-title',
      text: editingProduct ? 'Ubah Data Produk' : 'Tambah Produk Baru'
    }),
    errorBox,
    formField('Nama Produk *', 'prod-nama', nameInput),
    formField('Kategori *', 'prod-kategori', catSelect),
    el('div', { className: 'form-row-2' }, [
      formField('Harga (IDR) *', 'prod-harga', priceInput),
      formField('Stok (Unit) *', 'prod-stok', stockInput)
    ]),
    formField('Path Gambar Lokal', 'prod-image', imageInput),
    formField('Deskripsi Produk', 'prod-deskripsi', descInput),
    el('label', { className: 'checkbox-label', attrs: { for: 'prod-unggulan' } }, [
      featuredCheckbox,
      el('span', { text: 'Tandai sebagai Produk Unggulan' })
    ]),
    el('div', { className: 'form-actions' }, actions)
  ]);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      nama: nameInput.value,
      kategori: catSelect.value,
      harga: priceInput.value,
      stok: stockInput.value,
      imageUrl: imageInput.value,
      deskripsi: descInput.value,
      unggulan: featuredCheckbox.checked
    };

    const result = editingProduct
      ? store.updateProduct(editingProduct.id, payload)
      : store.addProduct(payload);

    if (!result.valid) {
      errorBox.textContent = result.errors.join(' ');
      errorBox.hidden = false;
    }
  });

  return form;
}

function formField(labelText, forId, control) {
  return el('div', { className: 'form-group' }, [
    el('label', { className: 'form-label', text: labelText, attrs: { for: forId } }),
    control
  ]);
}

function renderInventoryTable(store) {
  const tableWrapper = el('div', { className: 'table-card' }, [
    el('h2', { className: 'panel-title', text: `Daftar Inventaris (${store.products.length})` })
  ]);

  const scrollBox = el('div', { className: 'table-responsive' });
  const table = el('table', { className: 'inventory-table' });

  const thead = el('thead', {}, [
    el('tr', {}, [
      el('th', { text: 'Produk' }),
      el('th', { text: 'Kategori' }),
      el('th', { text: 'Harga' }),
      el('th', { text: 'Stok' }),
      el('th', { text: 'Aksi' })
    ])
  ]);

  const tbody = el('tbody');
  store.products.forEach((product) => {
    const isOut = product.stok === 0;
    const editBtn = el('button', {
      className: 'btn-table btn-edit',
      text: 'Edit',
      attrs: { type: 'button', 'aria-label': `Edit ${product.nama}` }
    });
    editBtn.addEventListener('click', () => store.startEdit(product.id));

    const deleteBtn = el('button', {
      className: 'btn-table btn-delete',
      text: 'Hapus',
      attrs: { type: 'button', 'aria-label': `Hapus ${product.nama}` }
    });
    deleteBtn.addEventListener('click', () => {
      if (window.confirm(`Apakah Anda yakin ingin menghapus "${product.nama}"?`)) {
        store.deleteProduct(product.id);
      }
    });

    const row = el('tr', { className: isOut ? 'row-out' : '' }, [
      el('td', {}, [
        el('div', { className: 'table-prod-name', text: product.nama }),
        product.unggulan
          ? el('span', { className: 'mini-badge', text: '★ Unggulan' })
          : null
      ]),
      el('td', { text: product.kategori }),
      el('td', { text: formatRupiah(product.harga) }),
      el('td', {}, [
        el('span', {
          className: `stock-pill ${isOut ? 'stock-zero' : 'stock-ok'}`,
          text: isOut ? '0 (Habis)' : String(product.stok)
        })
      ]),
      el('td', {}, [el('div', { className: 'table-actions' }, [editBtn, deleteBtn])])
    ]);
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  scrollBox.appendChild(table);
  tableWrapper.appendChild(scrollBox);
  return tableWrapper;
}