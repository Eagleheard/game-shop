import React from 'react';

import './style.scss';

import { IGame } from 'types/interfaces';
import { NavLink } from 'react-router-dom';

export const Game = ({ name, genre, author, price, logo }: IGame) => {
  return (
    <div className="card">
      <img className="card__img" src={logo} alt="logo"></img>
      <div className="card__description">
        <div className="card__main-information">
          <p className="card__name">{name}</p>
          <p className="card__genre">{genre}</p>
        </div>
        <div>
          <p className="card__price">Price: {price}</p>
          <NavLink to={`/${author}`}>{author}</NavLink>
        </div>
      </div>
    </div>
  );
};
