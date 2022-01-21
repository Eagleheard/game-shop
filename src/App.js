import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Header, About, Store, Footer } from 'screen';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
