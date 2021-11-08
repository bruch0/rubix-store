/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import GlobalStyles from './Shared/GlobalStyles';
import Navbar from './Shared/Navbar';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
