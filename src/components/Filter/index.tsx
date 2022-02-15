import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { fetchGameByGenre } from 'api/fetchGameByGenre';

import { Autocomplete, Select, Submit } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IFilter {
  games: IGame[];
  fillGames: (data: IGame[]) => void;
}

export const Filter: React.FC<IFilter> = ({ games, fillGames }) => {
  const [isDiskChecked, setIsDiskChecked] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handleFilterSelect = async (genre: string) => {
    const games = await fetchGameByGenre(genre);
    fillGames(games);
  };

  return (
    <div className="filter">
      <form onSubmit={handleSubmit(submitForm)} className="filter__form">
        <Autocomplete options={games.map(({ author }) => author)} register={register} />
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
            {...register('min_price', {
              validate: {
                matchesMinPrice: (value) => {
                  return value >= 0 || 'Price cannot be lower than zero';
                },
              },
            })}
            placeholder="min price"
            pattern="\d*"
            type="text"
            className="filter__price-min"
          />
          {errors.min_price && console.log(errors.min_price.message)}
          <input
            {...register('max_price', {
              validate: {
                matchesMaxPrice: (value) => {
                  const { min_price } = getValues();
                  return value >= min_price || 'Price cannot be lower than min price';
                },
              },
            })}
            placeholder="max_price"
            pattern="\d*"
            type="text"
            className="filter__price-max"
          />
          {errors.max_price && console.log(errors.max_price.message)}
        </div>
        <div className="filter__buttons">
          <Submit style="search" text="Filter" />
          <Submit style="clear" text="Clear" />
        </div>
      </form>
    </div>
  );
};
