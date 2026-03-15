import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/main';
import { AllBrandsPage } from '../pages/all-brands';
import { FragsPage } from '../pages/frags';     
import { KodexPage } from '../pages/Kodex';     
    
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/all-brands" element={<AllBrandsPage />} />
        <Route path="/brand/frags" element={<FragsPage />} />
        <Route path="/brand/kodex" element={<KodexPage />} />
 
      </Routes>
    </Router>
  );
}

export default App;