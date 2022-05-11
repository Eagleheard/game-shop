import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { useTimer } from 'hooks/useTimer';
import { ToastOptions } from 'types/enumerators';
import { ToastComponent } from 'components/Toast';
import { useToast } from 'hooks';
import { createOrder } from 'api/fetchOrders';
import { cartSelector } from 'store/cart/selectors';
import { CartState } from 'store/cart/types';
import { socket } from 'config';
import { IOrder } from 'types/interfaces';
import { clearCartRequest, getCartRequest, getDiscountRequest } from 'store/cart/actions';
import { Button, Loader, Timer } from 'components';
import { Card } from 'screen';

import './styles.scss';

export const Basket = () => {
  const { cart, isLoading, cartError } = useSelector((state: CartState) => state.cartReducer || []);
  const totalPrice = useSelector(cartSelector.cartPrice);
  const discount = useSelector(cartSelector.cartDiscount);
  const dispatch = useDispatch();
  const discountedPrice = useMemo(() => totalPrice - totalPrice * discount, [totalPrice, discount]);
  const { setIsActive } = useTimer();
  const { openToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fillOrder = async (params: IOrder) => {
    try {
      await createOrder(params);
      openToast('Successfully buyed', ToastOptions.success);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const submitForm = (params: IOrder) => {
    fillOrder(params);
    reset();
    dispatch(clearCartRequest());
  };

  useEffect(() => {
    dispatch(getCartRequest());
    dispatch(getDiscountRequest());
    if (cartError && !isLoading) {
      openToast(cartError, ToastOptions.error);
    }
    socket.connect();
    socket.on('clearedCart', () => {
      dispatch(clearCartRequest());
    });
  }, [cart.length, setIsActive]);

  return (
    <div className="basket">
      <div className="basket__container">
        <div className="basket__games">
          {cart.length !== 0 && <Timer />}
          {error && <p>Something wrong: {error}</p>}
          {!isLoading && !cart.length && <h1>Cart is empty</h1>}
          {cart && !isLoading ? (
            cart.map(({ game, quantity }) => (
              <Card cart key={game.id} {...game} quantity={quantity} />
            ))
          ) : (
            <Loader />
          )}
        </div>
        <form onSubmit={handleSubmit(submitForm)} className="basket__info">
          <div className="basket__payment">
            <h1>Payment</h1>
            <p className="basket__payment-price">Total price: {totalPrice}$</p>
            <p>Your personal discount: {Math.floor(discount * 100 ?? 0)}%</p>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className="basket__info">
            <div className="basket__payment">
              <h1>Payment</h1>
              <p className="basket__payment-price">Total price: {totalPrice}$</p>
              <p>Your personal discount: {discount * 100 ?? 0}%</p>
            </div>
            <div className="basket__delivery"></div>
            {cart.find(({ game }) => game.disk === true) && (
              <>
                <h2>Delivery information</h2>
                <div className="basket__delivery-info">
                  <label htmlFor="zip" className="basket__label">
                    ZIP-code
                  </label>
                  <input
                    {...register('zipCode', {
                      required: true,
                    })}
                    placeholder="ZIP-code"
                    className="basket__delivery-input"
                    id="zip"
                  />
                  {errors.zipCode && (
                    <p className="basket__delivery-input--error">ZIP-code cannot be empty</p>
                  )}
                  <label htmlFor="address" className="basket__label">
                    Address
                  </label>
                  <input
                    {...register('address', {
                      required: 'Address cannot be empty',
                    })}
                    placeholder="Address"
                    className="basket__delivery-input"
                    id="address"
                  />
                  {errors.address && (
                    <p className="basket__delivery-input--error">Address cannot be empty</p>
                  )}
                  <label htmlFor="comment" className="basket__label">
                    Comment
                  </label>
                  <input
                    {...register('comment')}
                    placeholder="Comment"
                    className="basket__delivery-input"
                    id="comment"
                  />
                </div>
              </>
            )}
            <div className="basket__order">
              <h3 className="basket__total-price">You will pay: {discountedPrice ?? 0}$</h3>
              <div className="basket__order-btn">
                <Button
                  text="Clear cart"
                  type="reset"
                  onClick={() => dispatch(clearCartRequest())}
                  style="clear"
                />
                <Button text="Buy now" type="submit" onClick={() => submitForm} style="search" />
              </div>
            </>
          <div className="basket__order">
            <h3 className="basket__total-price">You will pay: {discountedPrice ?? 0}$</h3>
            <div className="basket__order-btn">
              <Button text="Clear cart" type="reset" onClick={resetCart} style="clear" />
              <Button text="Buy now" type="submit" onClick={() => submitForm} style="search" />
            </div>
          </form>
          <ToastComponent />
        </div>
    </div>
  );
};
