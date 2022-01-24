import React from 'react';
import { NavLink } from 'react-router-dom';

import './responsive-style.scss';

export const ResponsiveHeader = ({ setNavVisibility }) => {
  const handleClick = () => {
    setNavVisibility((prevValue) => !prevValue);
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
        <NavLink to="/sign-in" className="mobile-nav__item  link" onClick={handleClick}>
          Sign In
        </NavLink>
        <NavLink to="/sign-up" className="mobile-nav__item  link" onClick={handleClick}>
          Sign Up
        </NavLink>
      </nav>
    </div>
  );
};
