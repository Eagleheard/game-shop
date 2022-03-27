import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { About, Store, Home } from 'screen';
import { Header, Footer } from 'components';
import { AuthorContainer } from 'screen/Author/components/container';
import { GamePageContainer } from 'screen/Game/components/container';

import './App.css';
import ErrorBoundary from 'components/ErrorBoundary';

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <Header />
        <div className="app__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
            <Route path="/game/:id" element={<GamePageContainer />} />
            <Route path="/author/:id" element={<AuthorContainer />} />
          </Routes>
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
