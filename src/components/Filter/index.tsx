import React from 'react';

import { Form } from 'components/Form';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IFilter {
  games: IGame[];
  fillGames: (data: IGame[]) => void;
}

export const Filter: React.FC<IFilter> = ({ games, fillGames }) => {
  return (
    <div className="filter">
      <Form games={games} fillGames={fillGames} />
    </div>
  );
};
