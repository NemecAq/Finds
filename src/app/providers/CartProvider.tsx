import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../shared/types';
import { cartApi, CartItem } from '../../shared/api/cart';
import { useAuth } from './AuthProvider';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        loadCart();
      } else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    }
  }, [isAuthenticated, authLoading]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartApi.getCart();
      setCart(response.items.map(item => item.product));
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    if (isAuthenticated) {
      try {
        await cartApi.addItem(product.id);
        await loadCart();
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    } else {
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = async (productId: string) => {
    if (isAuthenticated) {
      try {
        await cartApi.removeItem(productId);
        await loadCart();
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      }
    } else {
      const newCart = cart.filter(item => item.id !== productId);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        for (const item of cart) {
          await cartApi.removeItem(item.id);
        }
        await loadCart();
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    } else {
      setCart([]);
      localStorage.removeItem('cart');
    }
  };

  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};