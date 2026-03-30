import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../../widgets/header';
import { Footer } from '../../../widgets/footer/ui/Footer';
<<<<<<< HEAD
import { FavoriteButton } from '../../../features/add-to-favorites/FavoriteButton';
import { allProducts } from '../../../shared/data/products';
import './CategoryPage.css';

const categoriesList = [
  { id: 'all', name: 'Все товары', count: allProducts.length },
  { id: 'futbolki', name: 'Футболки', count: allProducts.filter(p => p.category === 'ФУТБОЛКИ').length },
  { id: 'zipki', name: 'Зипки', count: allProducts.filter(p => p.category === 'ЗИПКИ').length },
  { id: 'svitery', name: 'Свитеры', count: allProducts.filter(p => p.category === 'СВИТЕРЫ').length },
  { id: 'shtany', name: 'Штаны', count: allProducts.filter(p => p.category === 'ШТАНЫ').length },
  { id: 'kurtki', name: 'Куртки', count: allProducts.filter(p => p.category === 'КУРТКИ').length },
  { id: 'aksessuary', name: 'Аксессуары', count: allProducts.filter(p => p.category === 'АКССЕСУАРЫ').length },
];

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || 'all');
=======
import { AddToCartButton } from '../../../features/add-to-cart/ui/AddToCartButton';
import { FavoriteButton } from '../../../features/add-to-favorites/FavoriteButton';
import { Product } from '../../../shared/types';
import './CategoryPage.css';

const categoriesList = [
  { id: 'futbolki', name: 'ФУТБОЛКИ', title: 'Футболки', image: '/images-main/clothes3.png' },
  { id: 'zipki', name: 'ЗИПКИ', title: 'Зипки', image: '/images-main/clothes5.png' },
  { id: 'svitery', name: 'СВИТЕРЫ', title: 'Свитеры', image: '/images-main/clothes2.png' },
  { id: 'shtany', name: 'ШТАНЫ', title: 'Штаны', image: '/images-main/clothes6.png' },
  { id: 'kurtki', name: 'КУРТКИ', title: 'Куртки', image: '/images-main/clothes1.png' },
  { id: 'aksessuary', name: 'АКССЕСУАРЫ', title: 'Аксессуары', image: '/images-main/clothes4.png' }
];

const productsByCategory: Record<string, Product[]> = {
  'futbolki': [
    { id: 't1', name: 'Футболка классическая', brand: 'KODEX', price: 2990, image: '/images-main/popular1.png', description: 'Базовая футболка из 100% хлопка', category: 'ФУТБОЛКИ' },
    { id: 't2', name: 'Футболка оверсайз', brand: 'FRAGS', price: 3990, image: '/images-main/popular2.png', description: 'Свободный крой, мягкий хлопок', category: 'ФУТБОЛКИ' },
    { id: 't3', name: 'Футболка с принтом', brand: 'OMNIA', price: 3490, image: '/images-main/popular3.png', description: 'Оригинальный принт спереди', category: 'ФУТБОЛКИ' }
  ],
  'zipki': [
    { id: 'z1', name: 'Зипка легкая', brand: 'KODEX', price: 4990, image: '/images-main/popular4.png', description: 'Тонкая кофта на молнии', category: 'ЗИПКИ' },
    { id: 'z2', name: 'Зипка флисовая', brand: 'FRAGS', price: 5990, image: '/images-main/popular5.png', description: 'Теплый флис на молнии', category: 'ЗИПКИ' }
  ],
  'svitery': [
    { id: 's1', name: 'Свитшот классический', brand: 'KODEX', price: 5490, image: '/images-main/popular1.png', description: 'Классический свитшот с начесом', category: 'СВИТЕРЫ' },
    { id: 's2', name: 'Худи оверсайз', brand: 'FRAGS', price: 6990, image: '/images-main/popular2.png', description: 'Теплое худи с капюшоном', category: 'СВИТЕРЫ' }
  ],
  'shtany': [
    { id: 'p1', name: 'Джинсы прямые', brand: 'KODEX', price: 5990, image: '/images-main/popular3.png', description: 'Классические джинсы синего цвета', category: 'ШТАНЫ' },
    { id: 'p2', name: 'Карго', brand: 'FRAGS', price: 6490, image: '/images-main/popular4.png', description: 'Удобные штаны с карманами', category: 'ШТАНЫ' }
  ],
  'kurtki': [
    { id: 'j1', name: 'Бомбер', brand: 'KODEX', price: 8990, image: '/images-main/popular5.png', description: 'Классический бомбер', category: 'КУРТКИ' }
  ],
  'aksessuary': [
    { id: 'a1', name: 'Кепка', brand: 'KODEX', price: 1990, image: '/images-main/popular1.png', description: 'Хлопковая кепка', category: 'АКССЕСУАРЫ' },
    { id: 'a2', name: 'Сумка', brand: 'FRAGS', price: 3990, image: '/images-main/popular2.png', description: 'Сумка через плечо', category: 'АКССЕСУАРЫ' }
  ]
};

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || 'futbolki');
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false);

<<<<<<< HEAD
  const getCategoryName = (id: string) => {
    const cat = categoriesList.find(c => c.id === id);
    return cat ? cat.name : 'Все товары';
  };

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => {
        const categoryMap: Record<string, string> = {
          'futbolki': 'ФУТБОЛКИ',
          'zipki': 'ЗИПКИ',
          'svitery': 'СВИТЕРЫ',
          'shtany': 'ШТАНЫ',
          'kurtki': 'КУРТКИ',
          'aksessuary': 'АКССЕСУАРЫ',
        };
        return p.category === categoryMap[selectedCategory];
      });
=======
  const currentCategory = categoriesList.find(c => c.id === selectedCategory);
  const products = productsByCategory[selectedCategory] || [];
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf

  const getSortedProducts = () => {
    switch(sortBy) {
      case 'price-asc':
<<<<<<< HEAD
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filteredProducts;
=======
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
    }
  };

  const sortedProducts = getSortedProducts();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategoryFilter(false);
    navigate(`/category/${categoryId}`);
  };

<<<<<<< HEAD
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
=======
  if (!currentCategory) {
    return (
      <div className="category-not-found">
        <Header title="Категория не найдена" subtitle="" showOverlay={false} />
        <div className="not-found-content">
          <h1>Категория не найдена</h1>
          <button onClick={() => navigate('/')}>Вернуться на главную</button>
        </div>
        <Footer />
      </div>
    );
  }
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf

  return (
    <div className="category-page">
      <Header 
<<<<<<< HEAD
        title={selectedCategory === 'all' ? 'КАТАЛОГ' : getCategoryName(selectedCategory)} 
        subtitle="Все товары в одном месте" 
=======
        title={currentCategory.title} 
        subtitle="" 
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
        showOverlay={true} 
      />
      
      <main className="category-main">
        <div className="category-products">
          <div className="category-controls">
            <div className="category-filter">
              <button 
                className="filter-button"
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
<<<<<<< HEAD
                {selectedCategory === 'all' ? 'Все категории' : getCategoryName(selectedCategory)}
=======
                {currentCategory.name}
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
                <span className="filter-arrow">{showCategoryFilter ? '▲' : '▼'}</span>
              </button>
              
              {showCategoryFilter && (
                <div className="filter-dropdown">
                  {categoriesList.map(cat => (
                    <button
                      key={cat.id}
                      className={`filter-option ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(cat.id)}
                    >
<<<<<<< HEAD
                      <span>{cat.name}</span>
                      <span className="filter-option-count">{cat.count}</span>
=======
                      <div className="filter-option-icon">
                        <img src={cat.image} alt={cat.name} />
                      </div>
                      <span>{cat.name}</span>
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
                    </button>
                  ))}
                </div>
              )}
            </div>

<<<<<<< HEAD
            <div className="products-count">Найдено: {sortedProducts.length} товаров</div>
=======
            <div className="products-count">Найдено: {products.length} товаров</div>
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
            
            <div className="sort-container">
              <button 
                className="sort-button"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
<<<<<<< HEAD
                  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L3.5 11.293V2.5z"/>
=======
                  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L3.5 11.293V2.5zm5 0a.5.5 0 0 1 1 0v8.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L8.5 11.293V2.5z"/>
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
                </svg>
                Сортировка
                <span className="sort-current">
                  {sortBy === 'popular' && 'Популярные'}
                  {sortBy === 'price-asc' && 'Сначала дешевле'}
                  {sortBy === 'price-desc' && 'Сначала дороже'}
<<<<<<< HEAD
                  {sortBy === 'name-asc' && 'По названию (А-Я)'}
                  {sortBy === 'name-desc' && 'По названию (Я-А)'}
=======
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
                </span>
              </button>
              
              {showSortMenu && (
                <div className="sort-menu">
                  <button 
                    className={`sort-option ${sortBy === 'popular' ? 'active' : ''}`}
                    onClick={() => {
                      setSortBy('popular');
                      setShowSortMenu(false);
                    }}
                  >
                    Популярные
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'price-asc' ? 'active' : ''}`}
                    onClick={() => {
                      setSortBy('price-asc');
                      setShowSortMenu(false);
                    }}
                  >
                    Сначала дешевле
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'price-desc' ? 'active' : ''}`}
                    onClick={() => {
                      setSortBy('price-desc');
                      setShowSortMenu(false);
                    }}
                  >
                    Сначала дороже
                  </button>
<<<<<<< HEAD
                  <button 
                    className={`sort-option ${sortBy === 'name-asc' ? 'active' : ''}`}
                    onClick={() => {
                      setSortBy('name-asc');
                      setShowSortMenu(false);
                    }}
                  >
                    По названию (А-Я)
                  </button>
                  <button 
                    className={`sort-option ${sortBy === 'name-desc' ? 'active' : ''}`}
                    onClick={() => {
                      setSortBy('name-desc');
                      setShowSortMenu(false);
                    }}
                  >
                    По названию (Я-А)
                  </button>
=======
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
                </div>
              )}
            </div>
          </div>

          <div className="products-grid">
            {sortedProducts.map(product => (
<<<<<<< HEAD
              <div 
                key={product.id} 
                className="product-card" 
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: 'pointer' }}
              >
=======
              <div key={product.id} className="product-card">
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
                <div className="product-image-wrapper">
                  <FavoriteButton product={product} className="product-favorite-btn" />
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-brand">{product.brand}</h3>
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">{product.price.toLocaleString()} ₽</p>
<<<<<<< HEAD
=======
                  <AddToCartButton product={product} />
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};