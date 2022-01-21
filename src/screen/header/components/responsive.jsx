import React from 'react';
import { NavLink } from 'react-router-dom';

import './responsive-style.scss';

export const ResponsiveHeader = ({ setNavVisibility }) => {
  return (
    <div className="responsive-header">
      <nav className="mobile-nav">
        <NavLink
          to="/"
          className="mobile-nav__item"
          onClick={() => setNavVisibility((prevValue) => !prevValue)}
        >
          Home
        </NavLink>
        <NavLink
          to="/store"
          className="mobile-nav__item"
          onClick={() => setNavVisibility((prevValue) => !prevValue)}
        >
          Store
        </NavLink>
        <NavLink
          to="/about"
          className="mobile-nav__item"
          onClick={() => setNavVisibility((prevValue) => !prevValue)}
        >
          About
        </NavLink>
        <div className="mobile-nav__split"></div>
        <NavLink
          to="/sign-in"
          className="mobile-nav__item"
          onClick={() => setNavVisibility((prevValue) => !prevValue)}
        >
          Sign In
        </NavLink>
        <NavLink
          to="/sign-up"
          className="mobile-nav__item"
          onClick={() => setNavVisibility((prevValue) => !prevValue)}
        >
          Sign Up
        </NavLink>
      </nav>
    </div>
  );
};
