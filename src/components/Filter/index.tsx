import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchGameByGenre } from 'api/fetchGameByGenre';

import { Autocomplete, Select } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IFilter {
  games: IGame[];
  fillGames: (data: IGame[]) => void;
}

export const Filter: React.FC<IFilter> = ({ games, fillGames }) => {
  const [isDiskChecked, setIsDiskChecked] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const submitForm = (data: any) => {
    console.log(data);
  };

  const handleFilterSelect = async (genre: string) => {
    const games = await fetchGameByGenre(genre);
    fillGames(games);
  };

  return (
    <div className="filter">
      <form onSubmit={handleSubmit(submitForm)} className="filter__form">
        <Autocomplete author={games.map(({ author }) => author)} register={register} />
        <Select
          placeholder="Genre"
          options={[
            { id: 0, label: 'Action', value: 'Action' },
            { id: 1, label: 'RPG', value: 'RPG' },
            { id: 2, label: 'Racing', value: 'Racing' },
            { id: 3, label: 'Adventure', value: 'Adventure' },
          ]}
          style="filter"
          handleSelect={handleFilterSelect}
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
          <div>
            <input placeholder="Number of copies" className="filter__copies" type="text" />
          </div>
        )}
        <p>Price:</p>
        <div className="filter__price">
          <input
            {...register('min price')}
            placeholder="min price"
            type="text"
            className="filter__price-min"
          />
          <input
            {...register('max price')}
            placeholder="max price"
            type="text"
            className="filter__price-max"
          />
        </div>
        <div className="filter__buttons">
          <button type="submit" className="filter__search-btn">
            Filter
          </button>
          <button onClick={() => fillGames} className="filter__clear-btn">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
