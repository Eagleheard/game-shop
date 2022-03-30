import {
  ADD_GAME,
  GET_CART,
  DECREMENT_GAME,
  CLEAR_CART,
  CartActionTypes,
  REMOVE_GAME,
  DecrementGameAction,
} from 'store/cart/types';

export function addGame(payload: []): CartActionTypes {
  return {
    type: ADD_GAME,
    payload,
  };
}

export function decrementGame({payload: count}: DecrementGameAction): CartActionTypes {
  return {
    type: DECREMENT_GAME,
    payload: count,
  };
}

export function getCart(payload: []): CartActionTypes {
  return {
    type: GET_CART,
    payload,
  };
}

export function clearCart(payload: []): CartActionTypes {
  return {
    type: CLEAR_CART,
    payload,
  };
}

export function removeGame(payload: []): CartActionTypes {
  return {
    type: REMOVE_GAME,
    payload,
  };
}
