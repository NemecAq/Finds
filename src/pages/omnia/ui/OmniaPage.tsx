import React, { useState } from 'react';
import { Header } from '../../../widgets/header';
import { Footer } from '../../../widgets/footer/ui/Footer';
import { AddToCartButton } from '../../../features/add-to-cart/ui/AddToCartButton';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../shared/types';
import './OmniaPage.css';

const omniaProducts: Product[] = [
  { 
    id: 'o1', 
    name: 'Футболка OMNIA', 
    brand: 'OMNIA', 
    price: 4290, 
    image: '/images/omnia-product1.jpg',
    description: 'Футболка оверсайз из 100% хлопка. Принт на спине, усиленные швы. Идеальный выбор для повседневного образа.',
    category: 'ФУТБОЛКИ'
  },
  { 
    id: 'o2', 
    name: 'Свитшот OMNIA', 
    brand: 'OMNIA', 
    price: 5790, 
    image: '/images/omnia-product2.jpg',
    description: 'Теплый свитшот с начесом. Вышивка логотипа на груди. Мягкий и уютный, сохраняет тепло.',
    category: 'СВИТЕРЫ'
  },
  { 
    id: 'o3', 
    name: 'Шорты OMNIA', 
    brand: 'OMNIA', 
    price: 3490, 
    image: '/images/omnia-product3.jpg',
    description: 'Удобные шорты из плотного хлопка. Два боковых и один задний карман. Идеальны для лета.',
    category: 'ШТАНЫ'
  },
  { 
    id: 'o4', 
    name: 'Худи OMNIA', 
    brand: 'OMNIA', 
    price: 6490, 
    image: '/images/omnia-product4.jpg',
    description: 'Худи с принтом. Тяжелый хлопок 400г/м², капюшон на шнурке, удобные карманы.',
    category: 'СВИТЕРЫ'
  },
  { 
    id: 'o5', 
    name: 'Джинсы OMNIA', 
    brand: 'OMNIA', 
    price: 5990, 
    image: '/images/omnia-product5.jpg',
    description: 'Прямые джинсы из плотного хлопка. Темно-синий цвет, классическая посадка, пять карманов.',
    category: 'ШТАНЫ'
  },
  { 
    id: 'o6', 
    name: 'Кепка OMNIA', 
    brand: 'OMNIA', 
    price: 2490, 
    image: '/images/omnia-product6.jpg',
    description: 'Хлопковая кепка с вышитым логотипом. Регулируемый размер, универсальный дизайн.',
    category: 'АКССЕСУАРЫ'
  },
   { 
    id: 'o7', 
    name: 'Джинсы OMNIA', 
    brand: 'OMNIA', 
    price: 5990, 
    image: '/images/omnia-product.jpg',
    description: '',
    category: ''
  },
   { 
    id: 'o8', 
    name: 'Джинсы OMNIA', 
    brand: 'OMNIA', 
    price: 5990, 
    image: '/images/omnia-product.jpg',
    description: '',
    category: ''
  },
   { 
    id: 'o9', 
    name: 'Джинсы OMNIA', 
    brand: 'OMNIA', 
    price: 5990, 
    image: '/images/omnia-product.jpg',
    description: '',
    category: ''
  },
];

export const OmniaPage: React.FC = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);

  const sortedProducts = [...omniaProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <>
      <Header 
        title="OMNIA" 
        subtitle="" 
        backgroundImage="/images/omnia-header.jpg"
   
      />
      
      <main className="main-content">
        <a 
          href="/all-brands" 
          className="back-link" 
          onClick={(e) => { 
            e.preventDefault(); 
            navigate('/all-brands'); 
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
          Назад к брендам
        </a>

       

        <div className="sort-section">
          <div className="sort-container">
            <button 
              className="sort-button"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L3.5 11.293V2.5zm5 0a.5.5 0 0 1 1 0v8.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L8.5 11.293V2.5zm5 0a.5.5 0 0 1 1 0v8.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L13.5 11.293V2.5z"/>
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
          <div className="products-count">Найдено: {sortedProducts.length} товаров</div>
        </div>

        <div className="brand-products-grid">
          {sortedProducts.map(product => (
            <div key={product.id} className="brand-product-card">
              <div className="brand-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="brand-product-info">
                <p className="brand-product-description">{product.description}</p>
                <p className="brand-product-price">{product.price.toLocaleString()} ₽</p>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};