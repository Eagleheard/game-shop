import React from 'react';

import { NavLink } from 'react-router-dom';

import './responsive-style.scss';

export const ResponsiveHeader = () => {
  return (
    <div className="responsive-header">
      <nav className="mobile-nav">
        <NavLink to="/" className="mobile-nav__item">
          Home
        </NavLink>
        <NavLink to="/store" className="mobile-nav__item">
          Store
        </NavLink>
        <NavLink to="/about" className="mobile-nav__item">
          About
        </NavLink>
        <NavLink to="/sign-in" className="mobile-nav__item">
          Sign In
        </NavLink>
        <NavLink to="/sign-up" className="mobile-nav__item">
          Sign Up
        </NavLink>
      </nav>
    </div>
  );
};
