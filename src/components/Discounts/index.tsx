import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { AdminPanelState } from 'toolkitStore/types';
import { useToast } from 'hooks';
import { ToastComponent, Search } from 'components';
import { ToastOptions } from 'types/enumerators';
import { addDiscounts } from 'toolkitStore/thunk';
import { fetchGames } from 'api/fetchGames';
import { Button } from 'components/Button';
import { IGame } from 'types/interfaces';

import './styles.scss';

export const Discount: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const { openToast } = useToast();
  const { discountError, isLoading } = useSelector(
    (state: AdminPanelState) => state.adminPanelReducer || [],
  );

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
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  useEffect(() => {
    fillGames();
    if (discountError && !isLoading) {
      openToast(discountError, ToastOptions.error);
    }
  }, []);

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    dispatch(addDiscounts(data));
  };

  return (
    <div className="discount">
      <h1>Discounts</h1>
      <form onSubmit={handleSubmit(submitForm)} className="discount__form">
        <Controller
          name="gameName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Search games={games} onChangeSearch={onChange} reset={value} />
          )}
        />
        <div className="discount__group">
          <input
            {...register('discountCount', {
              required: true,
            })}
            id="discountCount"
            placeholder="Count"
            className="discount__count"
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />
          <label htmlFor="discountCount" className="discount__label">
            Count
          </label>
          {errors.count && <p className="discount__errors">Count cannot be empty</p>}
        </div>
        <div className="discount__group">
          <input
            {...register('startDiscount', {
              required: true,
            })}
            id="date"
            type="date"
            placeholder="Date"
            className="discount__price"
          />
          <label htmlFor="date" className="discount__label">
            Date
          </label>
        </div>
        <div className="discount__group">
          <input
            {...register('endDiscount', {
              required: true,
            })}
            id="date"
            type="date"
            placeholder="Date"
            className="discount__price"
          />
          <label htmlFor="date" className="discount__label">
            Date
          </label>
        </div>
        <div className="discount__submit">
          <Button text="Create discount" onClick={() => submitForm} style="sign-in" />
        </div>
      </form>
      <ToastComponent />
    </div>
  );
};
