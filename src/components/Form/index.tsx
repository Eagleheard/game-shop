import React, { useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { fetchGameByGenre } from 'api/fetchGameByGenre';

import { Autocomplete, Select, Submit } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IForm {
  games: IGame[];
  fillGames: (data: IGame[]) => void;
}

export const Form: React.FC<IForm> = ({ games, fillGames }) => {
  const [isDiskChecked, setIsDiskChecked] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm();

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handleFilterSelect = async (genre: string) => {
    const games = await fetchGameByGenre(genre);
    fillGames(games);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form">
      <Autocomplete options={games.map(({ author }) => author)} register={register} />
      <Controller
        control={control}
        name="genre"
        render={() => (
          <Select
            placeholder="Genre"
            options={[
              { id: 0, label: 'Action', value: 'Action' },
              { id: 1, label: 'RPG', value: 'RPG' },
              { id: 2, label: 'Racing', value: 'Racing' },
              { id: 3, label: 'Adventure', value: 'Adventure' },
            ]}
            style="form"
            handleSelect={handleFilterSelect}
          />
        )}
      />
      <p className="form__game-type">Game type:</p>
      <div className="form__digital">
        <input type="checkbox" />
        <label className="form__digital-label">Digital</label>
      </div>
      <div className="form__disk">
        <input type="checkbox" onClick={() => setIsDiskChecked((prevValue) => !prevValue)} />
        <label className="form__disk-label">Disk</label>
      </div>
      {isDiskChecked && (
        <div>
          <input placeholder="Number of copies" className="filter__copies" type="text" />
        </div>
      )}
      <p className="form__price-label">Price:</p>
      <div className="form__price">
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
          className="form__price-min"
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
          placeholder="max price"
          pattern="\d*"
          type="text"
          className="form__price-max"
        />
        {errors.max_price && console.log(errors.max_price.message)}
      </div>
      <div className="form__buttons">
        <Submit style="search" text="Filter" />
        <Submit style="clear" text="Clear" />
      </div>
    </form>
  );
};
