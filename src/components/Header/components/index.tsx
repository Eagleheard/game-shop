import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Search } from 'components/Search';
import { ResponsiveHeader } from './responsive';
import { SignIn, SignUp, Portal } from 'components';
import { useAuth } from 'hooks/useAuth';

import logo from 'assets/logo.png';
import menu from 'assets/menu.png';

import './style.scss';

export const Header = () => {
  const { user } = useAuth();
  const [isNavVisible, setNavVisibility] = useState<boolean>(false);
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false);

  const handleSwitch = () => {
    if (isSignInVisible) {
      setIsSignInVisible(false);
      setIsSignUpVisible(true);
    } else if (isSignUpVisible) {
      setIsSignInVisible(true);
      setIsSignUpVisible(false);
    }
  };

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
      {isNavVisible && (
        <ResponsiveHeader
          setNavVisibility={setNavVisibility}
          setIsSignInVisible={() => setIsSignInVisible((prevValue) => !prevValue)}
        />
      )}
      <Search />
      <div className="header__sign">
        {user ? (
          <button className="header__login  link"> Hi, {user.name} </button>
        ) : (
          <button
            className="header__login  link"
            onClick={() => setIsSignInVisible((prevValue) => !prevValue)}
            disabled={isSignUpVisible}
          >
            Login
          </button>
        )}
      </div>
      <img
        alt="burger"
        className="header__btn"
        onClick={() => setNavVisibility((prevCount) => !prevCount)}
        src={menu}
      ></img>
      {isSignInVisible && !user && (
        <Portal
          Component={SignIn}
          isOpen={isSignInVisible}
          text="Sign In"
          handleClose={() => setIsSignInVisible(false)}
          handleSwitch={handleSwitch}
        />
      )}
      {isSignUpVisible && (
        <Portal
          Component={SignUp}
          isOpen={isSignUpVisible}
          text="Sign Up"
          handleClose={() => setIsSignUpVisible(false)}
          handleSwitch={handleSwitch}
        />
      )}
    </header>
  );
};
