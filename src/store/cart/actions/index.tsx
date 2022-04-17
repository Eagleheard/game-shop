import {
  INCREMENT_GAME_REQUEST,
  DECREMENT_GAME_REQUEST,
  REMOVE_GAME_REQUEST,
  GET_CART_REQUEST,
  CHANGE_QUANTITY_SUCCESS,
  REMOVE_GAME_SUCCESS,
  GET_CART_SUCCESS,
  ADD_GAME,
  CLEAR_CART,
  GetCartSuccessAction,
  ClearCartAction,
  DecrementGameSuccessAction,
  RemoveGameSuccessAction,
  GET_DISCOUNT_REQUEST,
  GetDiscountSuccessAction,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAILURE,
} from 'store/cart/types';

export function addGame(gameId?: number, quantity?: number) {
  return {
    type: ADD_GAME,
    payload: {
      gameId,
      value: quantity,
    },
  };
}

export function decrementGameRequest(gameId?: number) {
  return {
    type: DECREMENT_GAME_REQUEST,
    payload: {
      gameId,
    },
  };
}

export function changeQuantitySuccess(payload: DecrementGameSuccessAction) {
  return {
    type: CHANGE_QUANTITY_SUCCESS,
    payload,
  };
}

export function incrementGameRequest(gameId?: number) {
  return {
    type: INCREMENT_GAME_REQUEST,
    payload: {
      gameId,
    },
  };
}

export function getDiscountRequest() {
  return {
    type: GET_DISCOUNT_REQUEST,
    payload: {
      isLoading: true,
    },
  };
}

export function getDiscountSuccess(payload?: GetDiscountSuccessAction) {
  return {
    type: GET_DISCOUNT_SUCCESS,
    payload,
    isLoading: false,
  };
}

export function getDiscountFailure(error: string) {
  return {
    type: GET_DISCOUNT_FAILURE,
    payload: {
      error,
    },
  };
}

export function getCartSuccess(payload?: GetCartSuccessAction) {
  return {
    type: GET_CART_SUCCESS,
    payload,
    isLoading: false,
  };
}

export function getCartRequest() {
  return {
    type: GET_CART_REQUEST,
    payload: {
      isLoading: true,
    },
  };
}

export function getCartFailure(error: string) {
  return {
    type: GET_CART_REQUEST,
    payload: {
      error,
    },
  };
}

export function clearCart(payload?: ClearCartAction) {
  return {
    type: CLEAR_CART,
    payload,
  };
}

export function removeGameRequest(gameId: number) {
  return {
    type: REMOVE_GAME_REQUEST,
    payload: {
      gameId,
    },
  };
}

export function removeGameSuccess(payload: RemoveGameSuccessAction) {
  return {
    type: REMOVE_GAME_SUCCESS,
    payload,
  };
}
