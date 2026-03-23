import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../app/providers/FavoritesProvider';
import { useAuth } from '../../app/providers/AuthProvider';
import { Product } from '../../shared/types';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  product: Product;
  className?: string;
  showText?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  product, 
  className = '',
  showText = false 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  const isFavorite = isInFavorites(product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/profile?tab=favorites');
      return;
    }
    
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <button 
      className={`favorite-btn ${className} ${isFavorite ? 'active' : ''}`} 
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      <svg width="24" height="24" viewBox="0 0 16 16" fill={isFavorite ? "rgba(18, 35, 93, 1)" : "none"} stroke="currentColor">
        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>
      {showText && (isFavorite ? 'В избранном' : 'В избранное')}
    </button>
  );
};