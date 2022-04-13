import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from 'components';
import { addGame } from 'store/cart/actions';

import './PageStyles.scss';

interface IGamePage {
  id?: number;
  name?: string;
  preview?: string;
  popularity?: number;
  price?: number;
  genre?: {
    id: number;
    name: string;
  };
  author?: {
    id: number;
    name: string;
  };
  description?: string;
  count?: string;
}

export const GamePage: React.FC<IGamePage> = ({
  id,
  name,
  preview,
  popularity,
  price,
  genre,
  author,
  description,
  count,
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [buyingCount, setBuyingCount] = useState(1);

  return (
    <div className="game">
      <div className="game__container-btn">
        <Button text="«" onClick={() => history(-1)} style="back-btn" />
      </div>
      <div className="game__container">
        <div className="game__info">
          <img src={preview} className="game__logo" />
          <div className="about">
            <div className="about__property">
              <p className="about__name">{name}</p>
              <p className="about__genre">Genre: {genre?.name}</p>
              <p className="about__author">
                Author:
                <NavLink className="about__author--link" to={`/author/${author?.id}`}>
                  {author?.name}
                </NavLink>
              </p>
              <p className="about__popularity">Popularity: {popularity}%</p>
              {count ? <p className="about__count">Count: {count}</p> : null}
              {count && (
                <div className="about__buying-count">
                  <Button
                    text="-"
                    onClick={() => setBuyingCount((prevValue) => prevValue - 1)}
                    style="cart-btn"
                    disabled={buyingCount === 1}
                  />
                  <p className="card__quantity">{buyingCount}</p>
                  <Button
                    text="+"
                    onClick={() => setBuyingCount((prevValue) => prevValue + 1)}
                    style="cart-btn"
                    disabled={buyingCount === parseInt(count)}
                  />
                </div>
              )}
            </div>
            <div className="game__buying">
              <Button
                text="Buy now"
                onClick={() => dispatch(addGame(id, buyingCount))}
                style="buy"
              />
              <p className="game__price">Price: {price}$</p>
            </div>
          </div>
        </div>
        <div className="description">
          <p className="description__label">Description: </p>
          <p className="description__text">{description}</p>
        </div>
      </div>
    </div>
  );
};
