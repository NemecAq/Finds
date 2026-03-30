import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import { OrdersProvider } from './providers/OrdersProvider';
import { MainPage } from '../pages/main';
import { AllBrandsPage } from '../pages/all-brands';
import { FragsPage } from '../pages/frags';
import { KodexPage } from '../pages/Kodex';
import { OmniaPage } from '../pages/omnia';
import { ProfilePage } from '../pages/profile';
import { CategoryPage } from '../pages/categories';
<<<<<<< HEAD
import { ProductPage } from '../pages/product';
import { CheckoutPage } from '../pages/checkout';
import { OrderPage } from '../pages/order';
=======
import './styles/global.css';
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf

function App() {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <CartProvider>
        <FavoritesProvider>
          <OrdersProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/all-brands" element={<AllBrandsPage />} />
                <Route path="/brand/frags" element={<FragsPage />} />
                <Route path="/brand/kodex" element={<KodexPage />} />
                <Route path="/brand/omnia" element={<OmniaPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order/:orderId" element={<OrderPage />} />
              </Routes>
            </BrowserRouter>
          </OrdersProvider>
        </FavoritesProvider>
      </CartProvider>
=======
      <FavoritesProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/all-brands" element={<AllBrandsPage />} />
              <Route path="/brand/frags" element={<FragsPage />} />
              <Route path="/brand/kodex" element={<KodexPage />} />
              <Route path="/brand/omnia" element={<OmniaPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </FavoritesProvider>
>>>>>>> 5c0ad7cdce73cb99d468f0f9b95fe04e6c412adf
    </AuthProvider>
  );
}

export default App;