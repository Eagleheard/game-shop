import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Autocomplete, Checkbox, Select, Button } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IForm {
  games: IGame[];
}

export const Form: React.FC<IForm> = ({ games }) => {
  const [isDiskChecked, setIsDiskChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    reset({ author: '', genre: '' });
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form">
      <Controller
        name="author"
        control={control}
        render={({ field: { onChange } }) => (
          <Autocomplete
            options={games.map(({ author }) => author)}
            name="Author"
            onChangeInput={onChange}
          />
        )}
      />
      <Controller
        name="genre"
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            placeholder="Genre"
            options={[
              { id: 0, label: 'Action', value: 'Action' },
              { id: 1, label: 'RPG', value: 'RPG' },
              { id: 2, label: 'Racing', value: 'Racing' },
              { id: 3, label: 'Adventure', value: 'Adventure' },
            ]}
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
                return value >= minPrice || 'Max price should be bigger then min price';
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
            {...register('copies')}
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
