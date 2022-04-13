import {
  GET_CART_SUCCESS,
  CLEAR_CART,
  CartActionTypes,
  REMOVE_GAME_SUCCESS,
  CHANGE_QUANTITY_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
} from 'store/cart/types';

const initialState = {
  cart: [
    {
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
  isLoading: false,
  error: '',
};
export function cartReducer(state = initialState, { type, payload }: CartActionTypes) {
  switch (type) {
    case CHANGE_QUANTITY_SUCCESS:
      return {
        ...state,
        cart: state.cart.map((game) => (game.gameId === payload.gameId ? payload : game)),
      };
    case REMOVE_GAME_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter(({ gameId }) => gameId !== payload.gameId),
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cart: payload,
        isLoading: false,
      };
    case GET_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
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
