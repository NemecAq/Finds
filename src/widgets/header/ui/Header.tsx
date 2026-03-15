import React from 'react';
import { HeartIcon, UserIcon, SearchIcon, BasketIcon } from '../../../shared/ui/icons/Icons';
import './Header.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'FINDS', 
  subtitle = 'Место, где начинаются новые открытия',
  backgroundImage = '/images-main/header-img.png'
}) => {
  return (
    <header className="header">
      <img className="header-image" src={backgroundImage} alt="Finds" />
      <nav className="nav-icons">
        <HeartIcon />
        <UserIcon />
        <SearchIcon />
        <BasketIcon />
      </nav>
     {window.location.pathname === '/' && <div className="header-text-overlay"></div>}
<h1 className="header-title">{title}</h1>
{subtitle && <h2 className="header-subtitle">{subtitle}</h2>}
    </header>
  );
};