import React from 'react';

import './style.scss';

import { IGame } from 'types/interfaces';
import { NavLink } from 'react-router-dom';

export const Card = ({ id, name, genre, author, price, image }: IGame) => {
  return (
    <div className="card">
      <img className="card__img" src={image} alt="logo"></img>
      <div className="card__description">
        <div className="card__main-information">
          <NavLink className="card__name--link" to={`/game/${id}`}>
            <p className="card__name">{name}</p>
          </NavLink>
          <p className="card__genre">{genre}</p>
        </div>
        <div>
          <p className="card__price">Price: {price}</p>
          <p className="card__author">
            <NavLink className="card__author--link" to={`/${author}`}>
              {author}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};