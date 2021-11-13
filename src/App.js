/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import GlobalStyles from './shared/GlobalStyles';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Product from './pages/public/Product';
import ModalContext from './contexts/ModalContext';

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
          </Routes>
        </ModalContext.Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
