import React from 'react';
import { NavLink } from 'react-router-dom';

import { IGame } from 'types/interfaces';

import './style.scss';

export const Card = ({ id, name, genre, author, price, image, purchaseDate, quantity }: IGame) => {
  return (
    <div className="card">
      <img className="card__img" src={image} alt="logo"></img>
      <div className="card__description">
        <div className="card__main-information">
          <NavLink className="card__name--link" to={`/game/${id}`}>
            <p className="card__name">{name}</p>
          </NavLink>
          {genre && <p className="card__genre">{genre.name}</p>}
          {purchaseDate && <p className="card__purchase-date">Date of purchase: {purchaseDate}</p>}
          {quantity && <p className="card__order-quantity">Quantity: {quantity}</p>}
        </div>
        <div>
          <p className="card__price">
            Price: {quantity ? parseInt(price) * parseInt(quantity) : price}$
          </p>
          {author && (
            <p className="card__author">
              <NavLink className="card__author--link" to={`/author/${author.id}`}>
                {author.name}
              </NavLink>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
