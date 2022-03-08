import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { About, Store, Home } from 'screen';
import { Header, Footer } from 'components';
import { AuthorContainer } from 'screen/Author/components/container';
import { GamePageContainer } from 'screen/Game/components/container';

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
          <Route path="/:author" element={<AuthorContainer />} />
          <Route path="/game/:id" element={<GamePageContainer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
