/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import GlobalStyles from './shared/GlobalStyles';
import Navbar from './components/Navbar';
import { useAuth, AuthProvider } from './contexts/AuthContext';

function App() {
  const { setUser, user } = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} exact />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
