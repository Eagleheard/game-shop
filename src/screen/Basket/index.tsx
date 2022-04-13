import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cartSelector } from 'store/cart/selectors';
import { CartState } from 'store/cart/types';
import { socket } from 'config';
import { clearCart, getCartRequest } from 'store/cart/actions';
import { Button, Checkbox } from 'components';
import { Card } from 'screen';

import './styles.scss';

export const Basket = () => {
  const { cart, isLoading, error } = useSelector((state: CartState) => state.cartReducer || []);
  const totalPrice = useSelector(cartSelector.cartPrice);
  const [isDelivery, setIsDelivery] = useState(false);
  const dispatch = useDispatch();
  const discountedPrice = useMemo(() => totalPrice - totalPrice * 0.15, [totalPrice]);

  useEffect(() => {
    dispatch(getCartRequest());
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
            cart.map(({ game, quantity }) => <Card key={game.id} {...game} quantity={quantity} />)
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
            <Checkbox label="Pickup" onClick={() => null} />
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
            <h3 className="basket__total-price">You will pay: {discountedPrice ?? 0}$</h3>
            <div className="basket__order-btn">
              <Button text="Clear cart" onClick={() => dispatch(clearCart())} style="clear" />
              <Button text="Buy now" onClick={() => null} style="search" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
