import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLinkClickHandler } from 'react-router-dom';

import { Search } from 'components/Search';
import { ResponsiveHeader } from './responsive';
import { SignIn, SignUp, Portal, Select } from 'components';
import { CheckUser, Logout } from 'api/authorization';
import { useAuth } from 'hooks/useAuth';

import logo from 'assets/logo.png';
import menu from 'assets/menu.png';

import './style.scss';

enum sortOptions {
  PROFILE = 'Profile',
  LOGOUT = 'Logout',
}

export const Header = () => {
  const { user, setUser } = useAuth();
  const [isNavVisible, setNavVisibility] = useState<boolean>(false);
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSwitch = () => {
    if (isSignInVisible) {
      setIsSignInVisible(false);
      setIsSignUpVisible(true);
    } else if (isSignUpVisible) {
      setIsSignInVisible(true);
      setIsSignUpVisible(false);
    }
  };

  const handleSelect = (value: string) => {
    switch (value) {
      case sortOptions.PROFILE:
        navigate(`/user/${user.id}`);
        break;
      case sortOptions.LOGOUT:
        signOut();
        break;
    }
  };

  const checkUser = async () => {
    try {
      const { data } = await CheckUser();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    Logout();
    setUser(null);
    setIsSignInVisible(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

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
          signOut={signOut}
        />
      )}
      <Search />
      <div className="header__sign">
        {user ? (
          <Select
            placeholder={`Hi, ${user.name}`}
            options={[
              { id: 0, label: 'Profile', value: 'Profile' },
              { id: 1, label: 'Logout', value: 'Logout' },
            ]}
            style="header"
            handleSelect={handleSelect}
          />
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
