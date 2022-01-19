import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'screen/header/components';
import { About } from 'screen/about/components';
import { Store } from 'screen/store/components';
import { Footer } from 'screen/footer/components';
import { Home } from 'screen/home/components';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App__content">
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
