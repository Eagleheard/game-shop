import { Autocomplete } from 'components/Autocomplete';
import React from 'react';
import { Card } from 'screen';
import { IGame } from 'types/interfaces';

import './styles.scss';

interface ISearch {
  games: IGame[];
  onChangeSearch: (value: string) => void;
}

export const Search: React.FC<ISearch> = ({ games, onChangeSearch }) => {
  return (
    <div className="search">
      <Autocomplete
        options={games.map(({ name }) => name)}
        name="Search games"
        onChangeInput={onChangeSearch}
      >
        {games.map((game) => (
          <Card search key={game.id} {...game} />
        ))}
      </Autocomplete>
    </div>
  );
};
