import { Autocomplete, Select } from 'components';
import React, { useState } from 'react';
import { IGame } from 'types/interfaces';

interface IFilter {
  games: IGame[];
  setGamesByAuthor: (author: string) => void;
  deleteFilter: () => void;
  handleSelect: (genre: string) => void;
}

export const Filter: React.FC<IFilter> = ({
  games,
  setGamesByAuthor,
  deleteFilter,
  handleSelect,
}) => {
  const [isDiskChecked, setIsDiskChecked] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const filtrate = (input: string) => {
    if (input) {
      setGamesByAuthor(input);
    }
    handleSelect;
  };

  return (
    <div className="filter">
      <Autocomplete
        author={games.map(({ author }) => author)}
        setFiltered={setFiltered}
        setInput={setInput}
        input={input}
        filtered={filtered}
      />
      <Select
        placeholder={'Genre'}
        options={[
          { id: 0, label: 'Action', value: 'action' },
          { id: 1, label: 'RPG', value: 'rpg' },
          { id: 2, label: 'Racing', value: 'racing' },
          { id: 3, label: 'Adventure', value: 'adventure' },
        ]}
        style="filter"
        handleSelect={handleSelect}
      />
      <div className="filter__digital">
        <label>Digital:</label>
        <input type="checkbox" />
      </div>
      <div className="filter__disk">
        <label>Disk:</label>
        <input type="checkbox" onClick={() => setIsDiskChecked((prevValue) => !prevValue)} />
      </div>
      {isDiskChecked && (
        <div className="filter__copies">
          <input placeholder="Number of copies" type="text" />
        </div>
      )}
      <p>Price:</p>
      <div className="filter__price">
        <input placeholder="min" type="text" className="filter__price-min" />
        <input placeholder="max" type="text" className="filter__price-max" />
      </div>
      <button onClick={() => filtrate(input)}>Filter</button>
      <button onClick={deleteFilter}>Delete</button>
    </div>
  );
};
