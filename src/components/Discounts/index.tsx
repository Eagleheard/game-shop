import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addDiscounts } from 'toolkitStore/thunk';
import { fetchGames } from 'api/fetchGames';
import { Autocomplete } from 'components';
import { Button } from 'components/Button';
import { IGame } from 'types/interfaces';

import './styles.scss';

export const Discount: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const fillGames = async () => {
    try {
      const { data } = await fetchGames();
      setGames(data.rows);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fillGames();
  }, []);

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    dispatch(addDiscounts(data));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(submitForm)} className="login__form">
        <div className="login__group">
          <Controller
            name="gameName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                reset={value}
                options={games.map(({ name }) => name)}
                name="Game"
                onChangeInput={onChange}
              />
            )}
          />
          <div className="new-game__group">
            <input
              {...register('discountCount', {
                required: true,
              })}
              id="discountCount"
              placeholder="Count"
              className="new-game__count"
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            />
            <label htmlFor="discountCount" className="new-game__label">
              Count
            </label>
            {errors.count && <p className="new-game__errors">Count cannot be empty</p>}
          </div>
          <div className="new-game__group">
            <input
              {...register('startDiscount', {
                required: true,
              })}
              id="date"
              type="date"
              placeholder="Date"
              className="new-game__price"
            />
            <label htmlFor="date" className="new-game__label">
              Date
            </label>
          </div>
          <div className="new-game__group">
            <input
              {...register('endDiscount', {
                required: true,
              })}
              id="date"
              type="date"
              placeholder="Date"
              className="new-game__price"
            />
            <label htmlFor="date" className="new-game__label">
              Date
            </label>
          </div>
        </div>
        <div className="login__submit">
          <Button text="Sign In" onClick={() => submitForm} style="sign-in" />
        </div>
      </form>
    </div>
  );
};
