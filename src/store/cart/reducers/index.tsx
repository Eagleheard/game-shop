import {
  GET_CART,
  CLEAR_CART,
  CartActionTypes,
  INCREMENT_GAME_SUCCESS,
  DECREMENT_GAME_SUCCESS,
  REMOVE_GAME_SUCCESS,
} from 'store/cart/types';

const initialState = {
  cart: [
    {
      id: 1,
      userId: 0,
      gameId: 0,
      quantity: 0,
      game: {
        id: 0,
        name: '',
        price: 0,
        image: 0,
        disk: null,
        digital: null,
      },
    },
  ],
};
export function cartReducer(state = initialState, { type, payload }: CartActionTypes) {
  switch (type) {
    case INCREMENT_GAME_SUCCESS:
      return {
        ...state,
        cart: state.cart.map((game) => (game.gameId === payload.gameId ? payload : game)),
      };
    case DECREMENT_GAME_SUCCESS:
      return {
        ...state,
        cart: state.cart.map((game) => (game.gameId === payload.gameId ? payload : game)),
      };
    case REMOVE_GAME_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter(({ gameId }) => gameId !== payload.gameId),
      };
    case GET_CART:
      return {
        ...state,
        cart: payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}
