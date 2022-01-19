import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import logo from 'assets/logo.png';

export const Header = () => {
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
            <NavLink to="/about" className="navbar__link">
              About
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/store" className="navbar__link">
              Store
            </NavLink>
          </li>
        </ul>
      </nav>
      <input type="search" placeholder="Search game..." className="header__search"></input>
      <input type="submit" value="Search"></input>
    </header>
  );
};
