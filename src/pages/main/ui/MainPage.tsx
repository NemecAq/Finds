import React from 'react';
import { Header } from '../../../widgets/header';
import { Footer } from '../../../widgets/footer/ui/Footer';
import { BrandsSlider } from '../../../widgets/brand-slider/ui';
import { CategoryCard } from '../../../entities/category';
import { BrandCard } from '../../../entities/brand/ui/BrandCard';
import { ProductCard } from '../../../entities/product';
import { useNavigate } from 'react-router-dom';
import { Brand, Category } from '../../../shared/types';
import { popularProducts } from '../../../shared/data/products';
import './MainPage.css';

const categories: Category[] = [
  { id: '1', name: 'ФУТБОЛКИ', image: '/images-main/clothes3.png' },
  { id: '2', name: 'ЗИПКИ', image: '/images-main/clothes5.png' },
  { id: '3', name: 'СВИТЕРЫ', image: '/images-main/clothes2.png' },
  { id: '4', name: 'ШТАНЫ', image: '/images-main/clothes6.png' },
  { id: '5', name: 'КУРТКИ', image: '/images-main/clothes1.png' },
  { id: '6', name: 'АКССЕСУАРЫ', image: '/images-main/clothes4.png' }
];

const brands: Brand[] = [
  { 
    id: '1', 
    name: 'KODEX', 
    description: 'KODEX — это бренд о чистоте формы и силе контраста.', 
    logo: '/images-main/brand1.jpg',
    coverImage: '/images-main/brand1-cover.jpg',
    products: []
  },
  { 
    id: '2', 
    name: 'FRAGS', 
    description: 'FRAGS — тёмная эстетика, собранная в форму.', 
    logo: '/images-main/brand2.jpg',
    coverImage: '/images-main/brand2-cover.jpg',
    products: []
  },
  { 
    id: '3', 
    name: 'OMNIA', 
    description: 'OMNIA — это 328 × 310, которую можно надеть.', 
    logo: '/images-main/brand3.jpg',
    coverImage: '/images-main/brand3-cover.jpg',
    products: []
  }
];

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    let categorySlug = '';
    switch(category.name) {
      case 'ФУТБОЛКИ':
        categorySlug = 'futbolki';
        break;
      case 'ЗИПКИ':
        categorySlug = 'zipki';
        break;
      case 'СВИТЕРЫ':
        categorySlug = 'svitery';
        break;
      case 'ШТАНЫ':
        categorySlug = 'shtany';
        break;
      case 'КУРТКИ':
        categorySlug = 'kurtki';
        break;
      case 'АКССЕСУАРЫ':
        categorySlug = 'aksessuary';
        break;
      default:
        categorySlug = category.name.toLowerCase();
    }
    navigate(`/category/${categorySlug}`);
  };

  const handleBrandClick = (brand: Brand) => {
    switch(brand.name) {
      case 'KODEX':
        navigate('/brand/kodex');
        break;
      case 'FRAGS':
        navigate('/brand/frags');
        break;
      case 'OMNIA':
        navigate('/brand/omnia');
        break;
      default:
        navigate(`/brand/${brand.name.toLowerCase()}`);
    }
  };

  return (
    <>
      <Header />
      
      <main className="main-content">
        <h1 className="section-title">КАТЕГОРИИ ТОВАРОВ</h1>
        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>

        <section className="brands-section">
          <h2 className="section-title">Популярные бренды</h2>
          <div className="brands-header">
            <a 
              href="/all-brands" 
              className="all-brands-link" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigate('/all-brands'); 
              }}
            >
              все бренды →
            </a>
          </div>
          <div className="brands-grid">
            {brands.map(brand => (
              <BrandCard 
                key={brand.id} 
                brand={brand} 
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        </section>

        <BrandsSlider 
          images={[
            '/images-main/featured-brand.png', 
            '/images-main/brand1.jpg', 
            '/images-main/brand2.jpg'
          ]}
          titles={[
            'ПЕРСПЕКТИВНЫЙ БРЕНД МЕСЯЦА', 
            'KODEX', 
            'FRAGS'
          ]}
        />

        <section className="popular-items-section">
          <h2 className="section-title">ПОПУЛЯРНЫЕ ПОЗИЦИИ</h2>
          <div className="products-grid">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            <a 
              href="/category/all" 
              className="more-card" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigate('/category/all'); 
              }}
            >
              <div className="more-content">
                <span className="more-word">ЕЩЕ</span>
                <span className="more-arrow">→</span>
              </div>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};