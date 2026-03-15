import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './providers/CartProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import { AuthProvider } from './providers/AuthProvider';
import { MainPage } from '../pages/main';
import { AllBrandsPage } from '../pages/all-brands';
import { FragsPage } from '../pages/frags';
import { KodexPage } from '../pages/Kodex';
import { OmniaPage } from '../pages/omnia';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/all-brands" element={<AllBrandsPage />} />
              <Route path="/brand/frags" element={<FragsPage />} />
              <Route path="/brand/kodex" element={<KodexPage />} />
              <Route path="/brand/omnia" element={<OmniaPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;