import { Product } from '../types';

// Начальные товары - ВСЕ товары из вашего проекта
const initialProducts: Product[] = [
  // FRAGS товары
  { id: 'f1', name: 'Футболка FRAGS', brand: 'FRAGS', price: 4990, image: '/images-main/frags-product1.jpg', description: 'FRAGS — тёмная эстетика, собранная в форму. Премиальный хлопок, идеальная посадка.', category: 'ФУТБОЛКИ' },
  { id: 'f2', name: 'Худи FRAGS', brand: 'FRAGS', price: 6490, image: '/images-main/frags-product2.jpg', description: 'Худи с минималистичным дизайном. Тяжелый хлопок 400г/м².', category: 'СВИТЕРЫ' },
  { id: 'f3', name: 'Джинсы FRAGS', brand: 'FRAGS', price: 5990, image: '/images-main/frags-product3.jpg', description: 'Прямые джинсы из плотного хлопка.', category: 'ШТАНЫ' },
  { id: 'f4', name: 'Кепка FRAGS', brand: 'FRAGS', price: 2990, image: '/images-main/frags-product4.jpg', description: 'Хлопковая кепка с вышитым логотипом.', category: 'АКССЕСУАРЫ' },
  { id: 'f5', name: 'Шорты FRAGS', brand: 'FRAGS', price: 3990, image: '/images-main/frags-product5.jpg', description: 'Удобные шорты из плотного хлопка.', category: 'ШТАНЫ' },
  
  // KODEX товары
  { id: 'k1', name: 'Футболка KODEX', brand: 'KODEX', price: 3990, image: '/images-main/kodex-product1.png', description: 'Базовая футболка из органического хлопка.', category: 'ФУТБОЛКИ' },
  { id: 'k2', name: 'Худи KODEX', brand: 'KODEX', price: 5990, image: '/images-main/kodex-product2.png', description: 'Тяжелое худи из плотного хлопка.', category: 'СВИТЕРЫ' },
  { id: 'k3', name: 'Брюки KODEX', brand: 'KODEX', price: 5490, image: '/images-main/kodex-product3.png', description: 'Прямые брюки из смесовой ткани.', category: 'ШТАНЫ' },
  { id: 'k4', name: 'Кепка KODEX', brand: 'KODEX', price: 1990, image: '/images-main/kodex-product4.png', description: 'Хлопковая кепка с вышивкой.', category: 'АКССЕСУАРЫ' },
  { id: 'k5', name: 'Шорты KODEX', brand: 'KODEX', price: 3990, image: '/images-main/kodex-product5.png', description: 'Спортивные шорты из хлопка.', category: 'ШТАНЫ' },
  { id: 'k6', name: 'Спортивные штаны KODEX', brand: 'KODEX', price: 8500, image: '/images-main/kodex-product7.png', description: 'Удобные спортивные штаны.', category: 'ШТАНЫ' },
  { id: 'k7', name: 'Толстовка KODEX', brand: 'KODEX', price: 6950, image: '/images-main/kodex-product8.png', description: 'Толстовка с начесом.', category: 'СВИТЕРЫ' },
  
  // OMNIA товары
  { id: 'o1', name: 'Футболка OMNIA', brand: 'OMNIA', price: 4290, image: '/images-main/omnia-product1.jpg', description: 'Футболка оверсайз из 100% хлопка.', category: 'ФУТБОЛКИ' },
  { id: 'o2', name: 'Свитшот OMNIA', brand: 'OMNIA', price: 5790, image: '/images-main/omnia-product2.jpg', description: 'Теплый свитшот с начесом.', category: 'СВИТЕРЫ' },
  { id: 'o3', name: 'Шорты OMNIA', brand: 'OMNIA', price: 3490, image: '/images-main/omnia-product3.jpg', description: 'Удобные шорты из плотного хлопка.', category: 'ШТАНЫ' },
  { id: 'o4', name: 'Худи OMNIA', brand: 'OMNIA', price: 6490, image: '/images-main/omnia-product4.jpg', description: 'Худи с принтом.', category: 'СВИТЕРЫ' },
  { id: 'o5', name: 'Джинсы OMNIA', brand: 'OMNIA', price: 5990, image: '/images-main/omnia-product5.jpg', description: 'Прямые джинсы из плотного хлопка.', category: 'ШТАНЫ' },
  { id: 'o6', name: 'Кепка OMNIA', brand: 'OMNIA', price: 2490, image: '/images-main/omnia-product6.jpg', description: 'Хлопковая кепка с вышитым логотипом.', category: 'АКССЕСУАРЫ' },
  
  // Дополнительные товары
  { id: 'g1', name: 'Зипка GARM', brand: 'GARM', price: 5490, image: '/images-main/popular4.png', description: 'Удобная кофта на молнии.', category: 'ЗИПКИ' },
  { id: 'n1', name: 'Футболка NOSKVA', brand: 'NOSKVA', price: 3990, image: '/images-main/popular5.png', description: 'Базовая футболка.', category: 'ФУТБОЛКИ' },
  { id: 'a1', name: 'Бомбер', brand: 'KODEX', price: 8990, image: '/images-main/clothes1.png', description: 'Классический бомбер.', category: 'КУРТКИ' },
  { id: 'a2', name: 'Шапка', brand: 'KODEX', price: 1990, image: '/images-main/clothes4.png', description: 'Теплая вязаная шапка.', category: 'АКССЕСУАРЫ' },
];

// Загружаем сохраненные товары из localStorage
let allProducts: Product[] = [];

const loadProducts = () => {
  const saved = localStorage.getItem('products');
  if (saved) {
    allProducts = JSON.parse(saved);
  } else {
    allProducts = [...initialProducts];
    localStorage.setItem('products', JSON.stringify(allProducts));
  }
};

loadProducts();

// Сохраняем товары в localStorage
const saveProductsToStorage = () => {
  localStorage.setItem('products', JSON.stringify(allProducts));
};

// GET все товары
export const getProducts = (): Product[] => {
  return allProducts;
};

// GET товары по бренду
export const getProductsByBrand = (brandName: string): Product[] => {
  return allProducts.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());
};

// GET товар по ID
export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(p => p.id === id);
};

// GET товары по категории
export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(p => p.category === category);
};

// POST добавить товар
export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const newProduct = {
    ...product,
    id: Date.now().toString()
  };
  allProducts = [...allProducts, newProduct];
  saveProductsToStorage();
  return newProduct;
};

// PUT обновить товар
export const updateProduct = (id: string, productData: Partial<Omit<Product, 'id'>>): Product | null => {
  const index = allProducts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  allProducts[index] = { ...allProducts[index], ...productData };
  saveProductsToStorage();
  return allProducts[index];
};

// DELETE удалить товар
export const deleteProduct = (id: string): boolean => {
  const initialLength = allProducts.length;
  allProducts = allProducts.filter(p => p.id !== id);
  if (allProducts.length === initialLength) return false;
  saveProductsToStorage();
  return true;
};

// Экспорт всех товаров
export { allProducts };

// Популярные товары (отдельные товары для главной)
export const popularProducts: Product[] = [
  allProducts.find(p => p.id === 'f1') || allProducts[0], // Футболка FRAGS
  allProducts.find(p => p.id === 'k1') || allProducts[1], // Футболка KODEX
  allProducts.find(p => p.id === 'o1') || allProducts[2], // Футболка OMNIA
  allProducts.find(p => p.id === 'f3') || allProducts[3], // Джинсы FRAGS
  allProducts.find(p => p.id === 'k3') || allProducts[4], // Брюки KODEX
].filter(Boolean);