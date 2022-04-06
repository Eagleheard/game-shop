import {
  ADD_GAME,
  GET_CART,
  CLEAR_CART,
  GetCartAction,
  ClearCartAction,
  INCREMENT_GAME_SUCCESS,
  INCREMENT_GAME_REQUEST,
  IncrementGameSuccessAction,
  DECREMENT_GAME_REQUEST,
  DECREMENT_GAME_SUCCESS,
  DecrementGameSuccessAction,
  REMOVE_GAME_REQUEST,
  RemoveGameSuccessAction,
  REMOVE_GAME_SUCCESS,
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

export function decrementGameSuccess(payload: DecrementGameSuccessAction) {
  return {
    type: DECREMENT_GAME_SUCCESS,
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

export function incrementGameSuccess(payload: IncrementGameSuccessAction) {
  return {
    type: INCREMENT_GAME_SUCCESS,
    payload,
  };
}

export function getCart(payload?: GetCartAction) {
  return {
    type: GET_CART,
    payload,
  };
}

export function clearCart(payload?: ClearCartAction) {
  return {
    type: CLEAR_CART,
    payload,
  };
}

export function RemoveGameRequest(gameId: number) {
  return {
    type: REMOVE_GAME_REQUEST,
    payload: {
      gameId,
    },
  };
}

export function RemoveGameSuccess(payload: RemoveGameSuccessAction) {
  return {
    type: REMOVE_GAME_SUCCESS,
    payload,
  };
}
