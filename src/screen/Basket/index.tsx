import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { socket } from 'config';
import { CartState } from 'store/cart/types';
import { clearCart, getCart } from 'store/cart/actions';
import { Button, Checkbox } from 'components';
import { Card } from 'screen';

import './styles.scss';

export const Basket = () => {
  const cart = useSelector((state: CartState) => state.cart.cart || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const dispatch = useDispatch();

  let totalPrice = cart.reduce(
    (accumulator: number, { game, quantity }) => accumulator + game.price * quantity,
    0,
  );

  useEffect(() => {
    socket.emit(
      'cart',
      cart.map(({ id }) => id),
    );
    socket.on('clearedCart', (data) => {
      dispatch(clearCart(data));
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getCart());
    setIsLoading(false);
  }, []);

  return (
    <div className="basket">
      <div className="basket__container">
        <div className="basket__games">
          {!cart.length && <h1>Cart is empty</h1>}
          {cart && !isLoading ? (
            cart.map(({ game, quantity }, id) => <Card key={id} {...game} quantity={quantity} />)
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className="basket__info">
          <div className="basket__payment">
            <h1>Payment</h1>
            <p className="basket__payment-price">Total price: {totalPrice}$</p>
            <p>Personal discount: -15%</p>
          </div>
          <div className="basket__delivery">
            <Checkbox label="Pickup" onClick={() => alert()} />
            <Checkbox label="Delivery" onClick={() => setIsDelivery((prevValue) => !prevValue)} />
          </div>
          {isDelivery && (
            <div className="basket__delivery-info">
              <label htmlFor="zip" className="basket__label">
                ZIP-code
              </label>
              <input placeholder="ZIP-code" className="basket__delivery-input" id="zip" />
              <label htmlFor="address" className="basket__label">
                Address
              </label>
              <input placeholder="Address" className="basket__delivery-input" id="address" />
            </div>
          )}
          <div className="basket__order">
            <h3 className="basket__total-price">
              You will pay: {(totalPrice = totalPrice - totalPrice * 0.15)}$
            </h3>
            <div className="basket__order-btn">
              <Button text="Clear cart" onClick={() => dispatch(clearCart())} style="clear" />
              <Button text="Buy now" onClick={() => alert()} style="search" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
