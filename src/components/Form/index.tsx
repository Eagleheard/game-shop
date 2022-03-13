import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { fetchGenres } from 'api/fetchGenres';

import { Autocomplete, Checkbox, Select, Button } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IForm {
  games: IGame[];
  fillGames: (params?: object) => void;
}

interface IGenre {
  id: number;
  name: string;
}

export const Form: React.FC<IForm> = ({ games, fillGames }) => {
  const [isDiskChecked, setIsDiskChecked] = useState<boolean>(false);
  const [genres, setGenres] = useState<IGenre[]>([]);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const fillGenres = async () => {
    try {
      const { data } = await fetchGenres();
      setGenres(data);
    } catch (e) {
      console.log(e);
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (params) => {
    fillGames(params);
    console.log(params);
  };

  const handleReset = () => {
    reset();
    setIsDiskChecked(false);
    fillGames();
  };

  useEffect(() => {
    fillGenres();
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form">
      <Controller
        name="authorName"
        control={control}
        render={({ field: { onChange } }) => (
          <Autocomplete
            options={games.map(({ author }) => author.name)}
            name="Author"
            onChangeInput={onChange}
          />
        )}
      />
      <Controller
        name="genreName"
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            placeholder="Genre"
            options={genres.map(({ id, name }) => ({
              id,
              value: name,
              label: name,
            }))}
            style="form"
            handleSelect={onChange}
          />
        )}
      />
      <p className="form__price-label">Price:</p>
      <div className="form__price">
        <input
          {...register('minPrice', {
            validate: {
              matchesMinPrice: (value) => {
                return value >= 0 || 'Price should be bigger then 0';
              },
            },
          })}
          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          placeholder="min price"
          type="text"
          className="form__price-min"
        />
        <input
          {...register('maxPrice', {
            validate: {
              matchesMaxPrice: (value) => {
                const { minPrice } = getValues();
                return value
                  ? value >= minPrice || 'Max price should be bigger then min price'
                  : undefined;
              },
            },
          })}
          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          placeholder="max price"
          type="text"
          className="form__price-max"
        />
      </div>
      {errors.minPrice && <p className="form__error">{errors.minPrice.message}</p>}
      {errors.maxPrice && <p className="form__error">{errors.maxPrice.message}</p>}
      <p className="form__game-type">Game type:</p>
      <Controller
        name="digital"
        control={control}
        render={({ field: { onChange } }) => <Checkbox label="Digital" onClick={onChange} />}
      />
      <Controller
        name="disk"
        control={control}
        render={({ field: { onChange } }) => (
          <Checkbox
            label="Disk"
            onChange={onChange}
            onClick={() => setIsDiskChecked((prevValue) => !prevValue)}
          />
        )}
      />
      {isDiskChecked && (
        <div>
          <input
            placeholder="Number of copies"
            className="form__copies"
            type="text"
            {...register('count')}
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />
        </div>
      )}
      <div className="form__buttons">
        <Button style="clear" text="Clear" type="reset" onClick={handleReset} />
        <Button style="search" text="Filter" type="submit" onClick={() => submitForm} />
      </div>
    </form>
  );
};
