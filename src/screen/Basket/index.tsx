import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import useToast from 'components/Toast';
import { createOrder } from 'api/fetchOrders';
import { cartSelector } from 'store/cart/selectors';
import { CartState } from 'store/cart/types';
import { socket } from 'config';
import { IOrder } from 'types/interfaces';
import { clearCart, getCartRequest, getDiscountRequest } from 'store/cart/actions';
import { Button } from 'components';
import { Card } from 'screen';

import './styles.scss';

export const Basket = () => {
  const { cart, isLoading, error } = useSelector((state: CartState) => state.cartReducer || []);
  const totalPrice = useSelector(cartSelector.cartPrice);
  const discount = useSelector(cartSelector.cartDiscount);
  const dispatch = useDispatch();
  const [toastType, setToastType] = useState<string>('');
  const discountedPrice = useMemo(() => totalPrice - totalPrice * discount, [totalPrice, discount]);
  const { openToast, ToastComponent, setMessage } = useToast(toastType);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fillOrder = async (params: IOrder) => {
    try {
      await createOrder(params);
      setMessage('Successfully buyed');
      setToastType('success');
      openToast();
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setMessage(String(message));
      setToastType('error');
      openToast();
    }
  };

  const submitForm = (params: IOrder) => {
    fillOrder(params);
    reset();
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(getCartRequest());
    dispatch(getDiscountRequest());
    socket.connect();
    socket.on('clearedCart', () => {
      dispatch(clearCart());
    });
  }, [dispatch]);

  return (
    <div className="basket">
      <div className="basket__container">
        <div className="basket__games">
          {error && <p>Something wrong: {error}</p>}
          {!cart.length && <h1>Cart is empty</h1>}
          {cart && !isLoading ? (
            cart.map(({ game, quantity }) => (
              <Card cart key={game.id} {...game} quantity={quantity} />
            ))
          ) : (
            <p>Loading</p>
          )}
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
                onClick={() => dispatch(clearCart())}
                style="clear"
              />
              <Button text="Buy now" type="submit" onClick={() => submitForm} style="search" />
            </div>
          </div>
        </form>
      </div>
      <ToastComponent />
    </div>
  );
};
