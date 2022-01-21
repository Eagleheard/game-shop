import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Search } from 'components/search';
import { ResponsiveHeader } from './responsive';

import logo from 'assets/logo.png';
import menu from 'assets/menu.jpg';

import './style.scss';

export const Header = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  return (
    <header className="header">
      <img src={logo} className="header__logo"></img>
      <nav className="navbar">
        <ul className="navbar__menu">
          <li className="navbar__item">
            <NavLink to="/" className="navbar__link">
              Home
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/store" className="navbar__link">
              Store
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/about" className="navbar__link">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      {isNavVisible && <ResponsiveHeader setNavVisibility={setNavVisibility} />}
      <Search />
      <div className="header__sign">
        <button className="header__sign-in"> Sign in</button>
        <button className="header__sign-up"> Sign up</button>
      </div>
      <img
        alt="burger"
        className="header__btn"
        onClick={() => setNavVisibility((prevCount) => !prevCount)}
        src={menu}
      ></img>
    </header>
  );
};
