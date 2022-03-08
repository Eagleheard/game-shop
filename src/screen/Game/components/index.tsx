import { Button } from 'components';
import React from 'react';
import { IGame } from 'types/interfaces';

import './PageStyles.scss';

export const GamePage: React.FC<IGame> = ({ name, image, popularity, price }) => {
  return (
    <div className="game">
      <div className="game__container">
        <div className="game__info">
          <img src={image} className="game__logo" />
          <div className="about">
            <p className="about__name">{name}</p>
            <p className="about__location">Price: {price}$</p>
            <p className="about__popularity">Popularity: {popularity}%</p>
          </div>
        </div>
        <Button text="Buy now" onClick={() => alert('hi')} style="search" />
        <Button text="Add to card" onClick={() => alert('hi')} style="clear" />
        <div className="description">
          <p className="description__label">Description: </p>
        </div>
      </div>
    </div>
  );
};
