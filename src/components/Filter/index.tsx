import React from 'react';

import { Form } from 'components/Form';
import { IGame, IParams } from 'types/interfaces';

import './style.scss';

interface IFilter {
  games: IGame[];
  fillGames: (params?: IParams) => void;
}

export const Filter: React.FC<IFilter> = ({ games, fillGames }) => {
  return (
    <div className="filter">
      <Form games={games} fillGames={fillGames} />
    </div>
  );
};
