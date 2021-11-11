/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import GlobalStyles from './shared/GlobalStyles';
import Navbar from './components/Navbar';
import { useAuth, AuthProvider } from './contexts/AuthContext';

function App() {
  const { setUser, user } = useAuth();

  const [modal, setModal] = useState(null);

  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Navbar user={user} setUser={setUser} modal={modal} setModal={setModal} />
        <Routes>
          <Route
            path="/"
            element={<Home setModal={setModal} />}
            exact
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
