import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button } from 'components';

import './PageStyles.scss';

interface IGamePage {
  name?: string;
  preview?: string;
  popularity?: number;
  price?: string;
  genre?: {
    id: number;
    name: string;
  };
  author?: {
    id: number;
    name: string;
  };
  description?: string;
}

export const GamePage: React.FC<IGamePage> = ({
  name,
  preview,
  popularity,
  price,
  genre,
  author,
  description,
}) => {
  const history = useNavigate();
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
                {`Author: `}
                <NavLink className="about__author--link" to={`/author/${author?.id}`}>
                  {author?.name}
                </NavLink>
              </p>
              <p className="about__popularity">Popularity: {popularity}%</p>
            </div>
            <div className="game__buying">
              <Button text="Buy now" onClick={() => alert('hi')} style="buy" />
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
