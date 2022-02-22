import React from 'react';

import { Form } from 'components/Form';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IFilter {
  games: IGame[];
}

export const Filter: React.FC<IFilter> = ({ games }) => {
  return (
    <div className="filter">
      <Form games={games} />
    </div>
  );
};
