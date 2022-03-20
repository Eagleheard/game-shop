import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from 'hooks/useAuth';
import { About, Store, Home } from 'screen';
import { Header, Footer } from 'components';
import { AuthorContainer } from 'screen/Author/components/container';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <div className="app__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
            <Route path="/author/:id" element={<AuthorContainer />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
