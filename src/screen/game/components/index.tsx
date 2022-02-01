import React from 'react';

import './style.scss';

import { IGame } from 'types/game';

export const Game = ({ name, genre, author, price, logo }: IGame) => {
  return (
    <div className="card">
      <img className="card__img" src={logo} alt="logo"></img>
      <h1 className="card__name">{name}</h1>
      <p className="card__author">{author}</p>
      <p className="card__genre">{genre}</p>
      <h1 className="card__price">Price: {price}</h1>
    </div>
  );
};
