import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import { AuthProvider } from 'hooks/useAuth';
import { About, Store, Home, Basket } from 'screen';
import { Header, Footer } from 'components';
import { AuthorContainer } from 'screen/Author/components/container';
import { GamePageContainer } from 'screen/Game/components/container';

import './App.css';

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <AuthProvider>
          <Header />
          <div className="app__content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/store" element={<Store />} />
              <Route path="/game/:id" element={<GamePageContainer />} />
              <Route path="/author/:id" element={<AuthorContainer />} />
              <Route path="/user/:id" element={<div>hi</div>} />
              <Route path="/cart/:id" element={<Basket />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
