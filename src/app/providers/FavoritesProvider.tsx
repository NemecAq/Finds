import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../shared/types';
import { favoritesApi } from '../../shared/api/favorites';
import { useAuth } from './AuthProvider';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  isInFavorites: (productId: string) => boolean;
  favoritesCount: number;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        loadFavorites();
      } else {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      }
    }
  }, [isAuthenticated, authLoading]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await favoritesApi.getFavorites();
      setFavorites(response);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (product: Product) => {
    if (isAuthenticated) {
      try {
        await favoritesApi.addProduct(product.id);
        await loadFavorites();
      } catch (error) {
        console.error('Failed to add to favorites:', error);
      }
    } else {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (isAuthenticated) {
      try {
        const favorite = favorites.find(f => f.id === productId);
        if (favorite) {
          await favoritesApi.removeProduct(favorite.id);
          await loadFavorites();
        }
      } catch (error) {
        console.error('Failed to remove from favorites:', error);
      }
    } else {
      const newFavorites = favorites.filter(item => item.id !== productId);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const isInFavorites = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isInFavorites,
      favoritesCount,
      loading
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};