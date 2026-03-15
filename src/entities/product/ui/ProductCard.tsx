import React from 'react';
import { Card } from '../../../shared/ui/card/Card';
import { Product } from '../../../shared/types';
import { FavoriteButton } from '../../../features/add-to-favorites/FavoriteButton';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="product-card">
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
    </Card>
  );
};