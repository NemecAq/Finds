import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../../widgets/header';
import { Footer } from '../../../widgets/footer/ui/Footer';
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
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false);

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

  const getSortedProducts = () => {
    switch(sortBy) {
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filteredProducts;
    }
  };

  const sortedProducts = getSortedProducts();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategoryFilter(false);
    navigate(`/category/${categoryId}`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="category-page">
      <Header 
        title={selectedCategory === 'all' ? 'КАТАЛОГ' : getCategoryName(selectedCategory)} 
        subtitle="Все товары в одном месте" 
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
                {selectedCategory === 'all' ? 'Все категории' : getCategoryName(selectedCategory)}
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
                      <span>{cat.name}</span>
                      <span className="filter-option-count">{cat.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="products-count">Найдено: {sortedProducts.length} товаров</div>
            
            <div className="sort-container">
              <button 
                className="sort-button"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L3.5 11.293V2.5z"/>
                </svg>
                Сортировка
                <span className="sort-current">
                  {sortBy === 'popular' && 'Популярные'}
                  {sortBy === 'price-asc' && 'Сначала дешевле'}
                  {sortBy === 'price-desc' && 'Сначала дороже'}
                  {sortBy === 'name-asc' && 'По названию (А-Я)'}
                  {sortBy === 'name-desc' && 'По названию (Я-А)'}
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
                </div>
              )}
            </div>
          </div>

          <div className="products-grid">
            {sortedProducts.map(product => (
              <div 
                key={product.id} 
                className="product-card" 
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: 'pointer' }}
              >
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