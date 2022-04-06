import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { decrementGameRequest, incrementGameRequest, RemoveGameRequest } from 'store/cart/actions';
import { IGame } from 'types/interfaces';
import { Button } from 'components';

import grey_cross from 'assets/grey-cross.png';

import './style.scss';

export const Card = ({ id, name, genre, author, price, image, quantity, disk, count }: IGame) => {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <img className="card__img" src={image} alt="logo"></img>
      <div className="card__description">
        <div className="card__main-information">
          <NavLink className="card__name--link" to={`/game/${id}`}>
            <p className="card__name">{name}</p>
          </NavLink>
          {genre && <p className="card__genre">{genre.name}</p>}
          {quantity && <p className="card__type">Type: {disk ? 'disk' : 'digital'}</p>}
          {quantity && disk && (
            <div className="card__quantity-value">
              <Button
                text="-"
                onClick={() => dispatch(decrementGameRequest(id))}
                style="cart-btn"
                disabled={quantity === 1}
              />
              <p className="card__quantity">{quantity}</p>
              <Button
                text="+"
                onClick={() => dispatch(incrementGameRequest(id))}
                style="cart-btn"
                disabled={parseInt(count) === 0}
              />
            </div>
          )}
        </div>
        <div className="card__additional-information">
          {quantity && (
            <button className="card__remove-btn" onClick={() => dispatch(RemoveGameRequest(id))}>
              <img src={grey_cross} />
            </button>
          )}
          <p className="card__price">Price: {price}$</p>
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
