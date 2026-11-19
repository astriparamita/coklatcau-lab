import { CATEGORIES, FALLBACK_IMAGE_SVG, STORE_INFO } from './products.js';

export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

export function buildWhatsAppUrl(product) {
  const message = [
    'Halo Admin Cau Chocolates Bali!',
    'Saya ingin memesan produk olahan kakao berikut:',
    `- Produk: ${product.nama}`,
    `- Harga: ${formatRupiah(product.harga)}`,
    `- Asal Gerai: ${STORE_INFO.subtitle}, Tabanan, Bali`,
    '',
    'Mohon info ketersediaan dan ongkos kirim. Terima kasih!'
  ].join('\n');

  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
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

  if (store.viewMode === 'catalog') {
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
    el('span', { className: 'brand-title', text: STORE_INFO.name }),
    el('span', {
      className: 'brand-subtitle',
      text: 'Marga, Tabanan · Bali'
    })
  ]);

  const catalogBtn = el('button', {
    className: `nav-tab ${store.viewMode === 'catalog' ? 'active' : ''}`,
    text: 'Katalog Belanja',
    attrs: {
      type: 'button',
      'aria-pressed': store.viewMode === 'catalog'
    }
  });
  catalogBtn.addEventListener('click', () => store.setViewMode('catalog'));

  const dashboardBtn = el('button', {
    className: `nav-tab ${store.viewMode === 'dashboard' ? 'active' : ''}`,
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
      el('nav', { className: 'nav-switcher', attrs: { 'aria-label': 'Mode Tampilan' } }, [
        catalogBtn,
        dashboardBtn
      ])
    ])
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
  const section = el('section', {
    className: 'catalog-section',
    attrs: { id: 'katalog-produk', 'aria-label': 'Daftar Produk Katalog' }
  });

  if (products.length === 0) {
    const resetFilterBtn = el('button', {
      className: 'btn btn-secondary',
      text: 'Reset Pencarian & Filter',
      attrs: { type: 'button' }
    });
    resetFilterBtn.addEventListener('click', () => {
      store.setFilter({ search: '', kategori: 'Semua', sort: 'unggulan' });
    });

    section.appendChild(
      el('div', { className: 'empty-state' }, [
        el('p', { text: 'Tidak ada produk cokelat yang sesuai dengan pencarian atau filter Anda.' }),
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
    if (img.src !== FALLBACK_IMAGE_SVG) {
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
        href: buildWhatsAppUrl(product),
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
