/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import Checkout from './pages/private/Checkout';
import GlobalStyles from './shared/GlobalStyles';
import Navbar from './components/Navbar';
import Product from './pages/public/Product';
import ModalContext from './contexts/ModalContext';
import { AuthProvider } from './contexts/AuthContext';
import RecoverPassword from './pages/public/RecoverPassword';
import Cart from './pages/private/Cart';

function App() {
  const [modal, setModal] = useState(null);

  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyles />
        <ModalContext.Provider value={{ modal, setModal }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/product/:id" element={<Product />} exact />
            <Route path="/recover" element={<RecoverPassword />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/checkout" element={<Checkout />} exact />
          </Routes>
        </ModalContext.Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
