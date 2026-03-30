import React from 'react';
import { Header } from '../../../widgets/header';
import { Footer } from '../../../widgets/footer/ui/Footer';
import { BrandCard } from '../../../entities/brand/ui/BrandCard';
import { useNavigate } from 'react-router-dom';
import { Brand } from '../../../shared/types';
import './AllBrandsPage.css';

const allBrands: Brand[] = [
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
  },
  { 
    id: '4', 
    name: 'KUROTOSHIRA', 
    description: 'Ручная работа по индивидуальным замерам', 
    logo: '/images-main/KUROTOSHIRA.jpg',
    coverImage: '/images-main/brand4-cover.jpg',
    products: []
  },
  { 
    id: '5', 
    name: 'GARMENTS MOSCOW', 
    description: 'GARMENTS MOSCOW — современная классика с элементами авангарда.', 
    logo: '/images-main/GM.jpg',
    coverImage: '/images-main/brand5-cover.jpg',
    products: []
  },
  { 
    id: '6', 
    name: 'ARKTIS', 
    description: 'ARKTIS — функциональность и стиль.', 
    logo: '/images-main/brand6.jpg',
    coverImage: '/images-main/brand6-cover.jpg',
    products: []
  },
  { 
    id: '7', 
    name: 'NORD', 
    description: 'NORD — скандинавский минимализм и практичность в каждой модели. Натуральные материалы и лаконичный дизайн.', 
    logo: '/images/brand7.jpg',
    coverImage: '/images/brand7-cover.jpg',
    products: []
  },
  { 
    id: '8', 
    name: 'VOLNA', 
    description: 'VOLNA — плавные линии и природные оттенки. Одежда, вдохновленная морской стихией и свободой.', 
    logo: '/images/brand8.jpg',
    coverImage: '/images/brand8-cover.jpg',
    products: []
  },
  { 
    id: '9', 
    name: 'STEREO', 
    description: 'STEREO — яркие цвета и смелые принты. Музыкальная эстетика для тех, кто любит выделяться.', 
    logo: '/images/brand9.jpg',
    coverImage: '/images/brand9-cover.jpg',
    products: []
  }
];

export const AllBrandsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header title="БРЕНДЫ" subtitle="" backgroundImage="/images-main/all-brands-header.png"/>
      
      <main className="main-content">
        <a 
          href="/" 
          className="back-link" 
          onClick={(e) => { 
            e.preventDefault(); 
            navigate('/'); 
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
          На главную
        </a>

      

        <div className="all-brands-grid">
          {allBrands.map(brand => (
            <BrandCard 
              key={brand.id} 
              brand={brand} 
              onClick={() => {
  if (brand.name === 'KODEX') navigate('/brand/kodex');
  else if (brand.name === 'FRAGS') navigate('/brand/frags');
  else if (brand.name === 'OMNIA') navigate('/brand/omnia');
  else if (brand.name === 'GARM') navigate('/brand/garm');
  else navigate(`/brand/${brand.name.toLowerCase()}`);
}}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};