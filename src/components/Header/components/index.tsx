import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Search } from 'components/Search';
import { ResponsiveHeader } from './responsive';
import { Login } from 'components/Sign';

import logo from 'assets/logo.png';
import menu from 'assets/menu.png';

import './style.scss';

export const Header = () => {
  const [isNavVisible, setNavVisibility] = useState<boolean>(false);
  const [isSignVisible, setIsSignVisible] = useState<boolean>(false);

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo"></img>
      <nav className="navbar">
        <ul className="navbar__menu">
          <li className="navbar__item">
            <NavLink to="/" className="navbar__link  link">
              Home
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/store" className="navbar__link  link">
              Store
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/about" className="navbar__link link">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      {isNavVisible && <ResponsiveHeader setNavVisibility={setNavVisibility} />}
      <Search />
      <div className="header__sign">
        <button
          className="header__sign-in  link"
          onClick={() => setIsSignVisible((prevValue) => !prevValue)}
        >
          Sign in
        </button>
        <button className="header__sign-up  link"> Sign up</button>
      </div>
      <img
        alt="burger"
        className="header__btn"
        onClick={() => setNavVisibility((prevCount) => !prevCount)}
        src={menu}
      ></img>
      {isSignVisible && <Login handleClose={() => setIsSignVisible(false)} />}
    </header>
  );
};
