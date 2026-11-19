import { CATEGORIES, INITIAL_PRODUCTS } from './products.js';

const STORAGE_KEY = 'cau_chocolates_catalog_data_v1';

function cloneSeedProducts() {
  return INITIAL_PRODUCTS.map((item) => ({ ...item }));
}

export function filterProducts(products, criteria = {}) {
  if (!Array.isArray(products)) return [];

  const query = typeof criteria.search === 'string' ? criteria.search.trim().toLowerCase() : '';
  const kategori = typeof criteria.kategori === 'string' ? criteria.kategori : 'Semua';
  const sort = typeof criteria.sort === 'string' ? criteria.sort : 'unggulan';

  const filtered = products.filter((product) => {
    const matchesCategory = kategori === 'Semua' || product.kategori === kategori;
    const nama = String(product.nama || '').toLowerCase();
    const deskripsi = String(product.deskripsi || '').toLowerCase();
    const matchesQuery = query === '' || nama.includes(query) || deskripsi.includes(query);

    return matchesCategory && matchesQuery;
  });

  return [...filtered].sort((a, b) => {
    if (sort === 'harga-asc') return a.harga - b.harga;
    if (sort === 'harga-desc') return b.harga - a.harga;
    if (sort === 'nama-asc') return a.nama.localeCompare(b.nama, 'id');
    if (a.unggulan !== b.unggulan) return a.unggulan ? -1 : 1;
    return a.nama.localeCompare(b.nama, 'id');
  });
}

export function validateProductInput(raw) {
  const errors = [];
  const nama = typeof raw.nama === 'string' ? raw.nama.trim() : '';
  const kategori = typeof raw.kategori === 'string' ? raw.kategori.trim() : '';
  const harga = Number(raw.harga);
  const stok = Number(raw.stok);
  const deskripsi = typeof raw.deskripsi === 'string' ? raw.deskripsi.trim() : '';
  const rawImage = typeof raw.imageUrl === 'string' ? raw.imageUrl.trim() : '';
  const isSafeLocalPath = rawImage.startsWith('/') && !rawImage.startsWith('//');
  const isSafeSvgData = rawImage.startsWith('data:image/svg+xml');
  const imageUrl =
    isSafeLocalPath || isSafeSvgData
      ? rawImage
      : '/assets/products/default-cacao.jpg';
  const unggulan = Boolean(raw.unggulan);

  if (nama.length < 3) {
    errors.push('Nama produk minimal 3 karakter.');
  }
  if (!CATEGORIES.includes(kategori)) {
    errors.push('Kategori produk tidak valid.');
  }
  if (!Number.isFinite(harga) || harga < 0) {
    errors.push('Harga harus berupa angka 0 atau lebih.');
  }
  if (!Number.isInteger(stok) || stok < 0) {
    errors.push('Stok harus berupa bilangan bulat 0 atau lebih.');
  }

  return {
    valid: errors.length === 0,
    errors,
    data: {
      nama,
      kategori,
      harga,
      stok,
      deskripsi,
      imageUrl,
      unggulan
    }
  };
}

function isValidProductRecord(item) {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.id !== 'string' || item.id.trim() === '') return false;
  return validateProductInput(item).valid;
}

export class CatalogStore {
  constructor() {
    this.products = this.loadFromStorage();
    this.viewMode = 'catalog';
    this.filters = {
      search: '',
      kategori: 'Semua',
      sort: 'unggulan'
    };
    this.editingProductId = null;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this));
  }

  loadFromStorage() {
    try {
      const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (!raw) {
        const seed = cloneSeedProducts();
        this.saveToStorage(seed);
        return seed;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.every(isValidProductRecord)) {
        const seed = cloneSeedProducts();
        this.saveToStorage(seed);
        return seed;
      }
      return parsed;
    } catch {
      const seed = cloneSeedProducts();
      this.saveToStorage(seed);
      return seed;
    }
  }

  saveToStorage(products = this.products) {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Gagal menyimpan data ke localStorage:', error);
    }
  }

  setViewMode(mode) {
    if (mode === 'catalog' || mode === 'dashboard') {
      this.viewMode = mode;
      if (mode === 'catalog') {
        this.editingProductId = null;
      }
      this.notify();
    }
  }

  setFilter(partialFilter) {
    this.filters = { ...this.filters, ...partialFilter };
    this.notify();
  }

  resetFilters() {
    this.filters = {
      search: '',
      kategori: 'Semua',
      sort: 'unggulan'
    };
    this.notify();
  }

  getFilteredProducts() {
    return filterProducts(this.products, this.filters);
  }

  getMetrics() {
    const totalProduk = this.products.length;
    const totalStok = this.products.reduce((sum, item) => sum + item.stok, 0);
    const stokHabis = this.products.filter((item) => item.stok === 0).length;
    const produkUnggulan = this.products.filter((item) => item.unggulan).length;

    return { totalProduk, totalStok, stokHabis, produkUnggulan };
  }

  startEdit(id) {
    this.editingProductId = id;
    this.notify();
  }

  cancelEdit() {
    this.editingProductId = null;
    this.notify();
  }

  addProduct(rawInput) {
    const validation = validateProductInput(rawInput);
    if (!validation.valid) return validation;

    const newProduct = {
      id: `cau-prod-${Date.now()}`,
      ...validation.data
    };

    this.products = [newProduct, ...this.products];
    this.saveToStorage();
    this.notify();
    return { valid: true, errors: [], data: newProduct };
  }

  updateProduct(id, rawInput) {
    const validation = validateProductInput(rawInput);
    if (!validation.valid) return validation;

    this.products = this.products.map((item) =>
      item.id === id ? { ...item, ...validation.data } : item
    );
    this.editingProductId = null;
    this.saveToStorage();
    this.notify();
    return { valid: true, errors: [] };
  }

  deleteProduct(id) {
    this.products = this.products.filter((item) => item.id !== id);
    if (this.editingProductId === id) {
      this.editingProductId = null;
    }
    this.saveToStorage();
    this.notify();
  }

  resetProducts() {
    this.products = cloneSeedProducts();
    this.editingProductId = null;
    this.saveToStorage();
    this.notify();
  }
}

export const store = new CatalogStore();