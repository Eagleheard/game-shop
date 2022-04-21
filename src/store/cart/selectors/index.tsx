import { CartState } from '../types';

export const cartPrice = (state: CartState) =>
  state.cartReducer.cart?.reduce(
    (accumulator: number, { game, quantity }) => accumulator + game.price * quantity,
    0,
  );

export const cartDiscount = (state: CartState) =>
  state.cartReducer.achievements
    ?.filter(({ isAchieved }) => isAchieved === true)
    .reduce((accumulator: number, { achievement }) => accumulator + achievement.discount, 0);

export * as cartSelector from '.';
