import { CartState } from '../types';

export const cartPrice = (state: CartState) =>
  state.cartReducer.cart?.reduce(
    (accumulator: number, { game, quantity }) => accumulator + game.price * quantity,
    0,
  );

export * as cartSelector from '.';
