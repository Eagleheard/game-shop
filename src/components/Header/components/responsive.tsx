import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

import './responsive-style.scss';

interface ResponsiveHeaderProps {
  setNavVisibility: (navVisible: boolean) => void;
  setIsSignInVisible: () => void;
  signOut: () => void;
}

export const ResponsiveHeader = ({
  setNavVisibility,
  setIsSignInVisible,
  signOut,
}: ResponsiveHeaderProps) => {
  const { user } = useAuth();
  const handleClick = () => {
    setNavVisibility(false);
  };

  const handleLogin = () => {
    setNavVisibility(false);
    setIsSignInVisible();
  };

  return (
    <div className="responsive-header">
      <nav className="mobile-nav">
        <NavLink to="/" className="mobile-nav__item  link" onClick={handleClick}>
          Home
        </NavLink>
        <NavLink to="/store" className="mobile-nav__item  link" onClick={handleClick}>
          Store
        </NavLink>
        <NavLink to="/about" className="mobile-nav__item  link" onClick={handleClick}>
          About
        </NavLink>
        <div className="mobile-nav__split"></div>
        {user ? (
          <button className="header__login  link" onClick={signOut}>
            Hi, {user.name}
          </button>
        ) : (
          <button className="header__login  link" onClick={handleLogin}>
            Login
          </button>
        )}
      </nav>
    </div>
  );
};
