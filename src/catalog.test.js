import { beforeEach, describe, expect, it } from 'vitest';
import { INITIAL_PRODUCTS } from './products.js';
import { CatalogStore, filterProducts, validateProductInput } from './store.js';
import { buildWhatsAppUrl, normalizeInternationalPhone } from './ui.js';

function createMemoryStorage() {
  const map = new Map();
  return {
    getItem(key) {
      return map.has(key) ? map.get(key) : null;
    },
    setItem(key, value) {
      map.set(key, String(value));
    },
    removeItem(key) {
      map.delete(key);
    },
    clear() {
      map.clear();
    }
  };
}

describe('Cau Chocolates Bali Catalog — Unit Tests', () => {
  beforeEach(() => {
    globalThis.localStorage = createMemoryStorage();
  });

  // 1-3: filterProducts
  it('1. filterProducts: mencari secara case-insensitive pada nama dan deskripsi', () => {
    const byName = filterProducts(INITIAL_PRODUCTS, {
      search: 'GINGER',
      kategori: 'Semua',
      sort: 'unggulan'
    });
    expect(byName.map((p) => p.id)).toEqual(['cau-prod-005']);

    const byDesc = filterProducts(INITIAL_PRODUCTS, {
      search: 'kusamba',
      kategori: 'Semua',
      sort: 'unggulan'
    });
    expect(byDesc.map((p) => p.id)).toEqual(['cau-prod-004']);
  });

  it('2. filterProducts: menggabungkan filter kategori dengan sorting harga termurah/termahal', () => {
    const darkAsc = filterProducts(INITIAL_PRODUCTS, {
      search: '',
      kategori: 'Dark Chocolate',
      sort: 'harga-asc'
    });
    expect(darkAsc.map((p) => p.harga)).toEqual([42000, 45000, 45000]);

    const allDesc = filterProducts(INITIAL_PRODUCTS, {
      search: '',
      kategori: 'Semua',
      sort: 'harga-desc'
    });
    expect(allDesc[0].harga).toBe(55000);
    expect(allDesc[allDesc.length - 1].harga).toBe(30000);
  });

  it('3. filterProducts: mengurutkan nama A-Z dan mengembalikan array kosong jika tidak cocok', () => {
    const sortedAlpha = filterProducts(INITIAL_PRODUCTS, {
      search: '',
      kategori: 'Semua',
      sort: 'nama-asc'
    });
    expect(sortedAlpha[0].nama).toBe('Cau Artisan Coffee Cocoa Bar 55%');

    const emptyResult = filterProducts(INITIAL_PRODUCTS, {
      search: 'matcha-tidak-ada',
      kategori: 'Milk Chocolate',
      sort: 'unggulan'
    });
    expect(emptyResult).toEqual([]);
  });

  // 4-6: validateProductInput (termasuk kasus batas harga/stok & kategori tidak valid)
  it('4. validateProductInput: menerima nilai batas valid (harga 0 dan stok integer 0)', () => {
    const res = validateProductInput({
      nama: 'Cokelat Tester Gratis',
      kategori: 'Dark Chocolate',
      harga: 0,
      stok: 0,
      deskripsi: 'Sampel uji batas bawah',
      imageUrl: '/assets/products/cau-dark-80.jpg',
      unggulan: false
    });
    expect(res.valid).toBe(true);
    expect(res.errors).toEqual([]);
  });

  it('5. validateProductInput: menolak harga negatif, stok desimal, atau stok negatif', () => {
    const negPrice = validateProductInput({
      nama: 'Cau Dark 70%',
      kategori: 'Dark Chocolate',
      harga: -1000,
      stok: 5
    });
    expect(negPrice.valid).toBe(false);

    const floatStock = validateProductInput({
      nama: 'Cau Dark 70%',
      kategori: 'Dark Chocolate',
      harga: 45000,
      stok: 2.5
    });
    expect(floatStock.valid).toBe(false);

    const negStock = validateProductInput({
      nama: 'Cau Dark 70%',
      kategori: 'Dark Chocolate',
      harga: 45000,
      stok: -2
    });
    expect(negStock.valid).toBe(false);
  });

  it('6. validateProductInput: menolak kategori tidak valid dan nama terlalu pendek', () => {
    const invalidCat = validateProductInput({
      nama: 'Cau Susu Jahe',
      kategori: 'Kategori Fiktif',
      harga: 40000,
      stok: 10
    });
    expect(invalidCat.valid).toBe(false);

    const shortName = validateProductInput({
      nama: 'Ab',
      kategori: 'Milk Chocolate',
      harga: 40000,
      stok: 10
    });
    expect(shortName.valid).toBe(false);
  });

  // 7-9: buildWhatsAppUrl & validasi nomor telepon
  it('7. buildWhatsAppUrl: menghasilkan URL wa.me ter-encode untuk nomor internasional valid', () => {
    const product = INITIAL_PRODUCTS[0];
    const url = buildWhatsAppUrl('6281234567890', product);
    expect(url.startsWith('https://wa.me/6281234567890?text=')).toBe(true);
    const decoded = decodeURIComponent(url.split('?text=')[1]);
    expect(decoded).toContain('Cau Organic Dark Chocolate 80%');
    expect(decoded).toContain('Cau Chocolates Factory & Restaurant, Tabanan, Bali');
  });

  it('8. buildWhatsAppUrl: menolak nomor telepon tidak valid atau kosong', () => {
    const product = INITIAL_PRODUCTS[0];
    expect(normalizeInternationalPhone('0812-345')).toBe('');
    expect(buildWhatsAppUrl('bukan-nomor', product)).toBe('#');
    expect(buildWhatsAppUrl('', product)).toBe('#');
  });

  it('9. buildWhatsAppUrl: mengenkode karakter khusus pada nama produk dengan aman', () => {
    const specialProduct = {
      nama: 'Cokelat & Jahe "Spesial" #1',
      harga: 50000,
      stok: 5
    };
    const url = buildWhatsAppUrl('+62 812-3456-7890', specialProduct);
    expect(url.startsWith('https://wa.me/6281234567890?text=')).toBe(true);
    expect(url).not.toContain(' ');
  });

  // 10-12: parser localStorage & payload rusak
  it('10. localStorage parser: menginisialisasi 8 seed product saat storage kosong', () => {
    const storeInstance = new CatalogStore();
    expect(storeInstance.products).toHaveLength(8);
    expect(storeInstance.getMetrics().stokHabis).toBe(1);
  });

  it('11. localStorage parser: fallback ke 8 seed product saat JSON korup', () => {
    localStorage.setItem('cau_chocolates_catalog_data_v1', '{bukan-json-valid');
    const storeInstance = new CatalogStore();
    expect(storeInstance.products).toHaveLength(8);
    expect(storeInstance.products[0].id).toBe('cau-prod-001');
  });

  it('12. localStorage parser: fallback ke 8 seed product saat payload array berisi item rusak', () => {
    const corruptedPayload = [
      {
        id: 'rusak-1',
        nama: 'X',
        kategori: 'Kategori Salah',
        harga: -500,
        stok: -1
      }
    ];
    localStorage.setItem(
      'cau_chocolates_catalog_data_v1',
      JSON.stringify(corruptedPayload)
    );
    const storeInstance = new CatalogStore();
    expect(storeInstance.products).toHaveLength(8);
  });
});