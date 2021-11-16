/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/public/Home';
import Checkout from './pages/private/Checkout';
import GlobalStyles from './shared/GlobalStyles';
import Navbar from './components/Navbar';
import Product from './pages/public/Product';
import ModalContext from './contexts/ModalContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import RecoverPassword from './pages/public/RecoverPassword';
import Cart from './pages/private/Cart';
import User from './pages/private/User';

function App() {
  const [modal, setModal] = useState(null);

  function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyles />
        <ModalContext.Provider value={{ modal, setModal }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/recover" element={<RecoverPassword />} />
            <Route
              path="/cart"
              element={(<PrivateRoute><Cart /></PrivateRoute>)}
            />
            <Route
              path="/checkout"
              element={(<PrivateRoute><Checkout /></PrivateRoute>)}
            />
            <Route
              path="/user"
              element={(<PrivateRoute><User /></PrivateRoute>)}
            />
          </Routes>
        </ModalContext.Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
