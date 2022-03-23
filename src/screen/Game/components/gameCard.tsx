import React from 'react';
import { NavLink } from 'react-router-dom';

import { IGame } from 'types/interfaces';

import './style.scss';

export const Card = ({ id, name, genre, author, price, image }: IGame) => {
  return (
    <div className="card">
      <img className="card__img" src={image} alt="logo"></img>
      <div className="card__description">
        <div className="card__main-information">
          <NavLink className="card__name--link" to={`/game/${id}`}>
            <p className="card__name">{name}</p>
          </NavLink>
          <p className="card__genre">{genre.name}</p>
        </div>
        <div>
          <p className="card__price">Price: {price}</p>
          <p className="card__author">
            <NavLink className="card__author--link" to={`/author/${author.id}`}>
              {author.name}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};