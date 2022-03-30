import {
  ADD_GAME,
  GET_CART,
  DECREMENT_GAME,
  CLEAR_CART,
  CartActionTypes,
  REMOVE_GAME,
} from 'store/cart/types';

const initialState = {
  cart: [{ id: 0, gameId: 0, userId: 0, count: 0 }],
};

export function cartReducer(state = initialState, { type, payload }: CartActionTypes) {
  switch (type) {
    case ADD_GAME:
      return {
        ...state,
        cart: [...state.cart, ...payload],
      };
    case REMOVE_GAME:
      return {
        ...state,
        cart: [...state.cart, ...payload],
      };
    case GET_CART:
      return {
        ...state,
        cart: [...state.cart, ...payload],
      };
    case DECREMENT_GAME:
      return {
        ...state,
        cart: [...state.cart, ...payload],
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [...state.cart, ...payload],
      };
    default:
      return state;
  }
}
