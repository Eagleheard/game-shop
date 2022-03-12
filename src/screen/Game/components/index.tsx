import React from 'react';
import { NavLink } from 'react-router-dom';

import { IGame } from 'types/interfaces';
import { Button } from 'components';

import './PageStyles.scss';

export const GamePage: React.FC<IGame> = ({
  name,
  preview,
  popularity,
  price,
  genre,
  author,
  description,
}) => {
  return (
    <div className="game">
      <div className="game__container">
        <div className="game__info">
          <img src={preview} className="game__logo" />
          <div className="about">
            <div className="about__property">
              <p className="about__name">{name}</p>
              <p className="about__genre">Genre: {genre.name}</p>
              <p className="about__author">
                {`Author: `}
                <NavLink className="about__author--link" to={`/author/${author.id}`}>
                  {author.name}
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
