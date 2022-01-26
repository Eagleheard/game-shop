import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, About, Store, Footer, Home } from 'screen';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
