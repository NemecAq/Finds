import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../app/providers/CartProvider';
import { useFavorites } from '../../../app/providers/FavoritesProvider';
import { useAuth } from '../../../app/providers/AuthProvider';
import { CartModal } from '../../../features/cart/ui/CartModal';
import { FavoritesModal } from '../../../features/favorites/ui/FavoritesModal';
import { AuthModal } from '../../../features/auth/ui/AuthModal';
import './Header.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  showOverlay?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'FINDS', 
  subtitle = 'Место, где начинаются новые открытия',
  backgroundImage = '/images-main/header-img.png',
  showOverlay = true
}) => {
  const navigate = useNavigate();
  

  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { user, logout } = useAuth();
  
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <header className="header">
        <img className="header-image" src={backgroundImage} alt="Finds" />
        
        <nav className="nav-icons">
          <div className="icon-wrapper" onClick={() => setShowFavorites(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
            {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
          </div>

          <div className="icon-wrapper" onClick={() => user ? setShowUserMenu(!showUserMenu) : setShowAuth(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            {user && <span className="online-indicator"></span>}
          </div>

          <div className="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>

          <div className="icon-wrapper" onClick={() => setShowCart(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1z"/>
            </svg>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </div>
        </nav>

        {showUserMenu && user && (
          <div className="user-menu">
            <div className="user-info">
              <img src={user.avatar || '/images/default-avatar.jpg'} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
            </div>
            <button className="menu-item" onClick={() => navigate('/profile')}>
              Личный кабинет
            </button>
            <button className="menu-item" onClick={() => navigate('/orders')}>
              Мои заказы
            </button>
            <button className="menu-item logout" onClick={logout}>
              Выйти
            </button>
          </div>
        )}
        
        {showOverlay && <div className="header-text-overlay"></div>}
        
        <h1 className="header-title">{title}</h1>
        {subtitle && <h2 className="header-subtitle">{subtitle}</h2>}
      </header>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
      {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
};
