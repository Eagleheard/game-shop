export const ADD_GAME = 'ADD_GAME';
export const REMOVE_GAME_REQUEST = 'REMOVE_GAME_REQUEST';
export const REMOVE_GAME_SUCCESS = 'REMOVE_GAME_SUCCESS';
export const DECREMENT_GAME_REQUEST = 'DECREMENT_GAME_REQUEST';
export const DECREMENT_GAME_SUCCESS = 'DECREMENT_GAME_SUCCESS';
export const INCREMENT_GAME_REQUEST = 'INCREMENT_GAME_REQUEST';
export const INCREMENT_GAME_SUCCESS = 'INCREMENT_GAME__SUCCESS';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_CART = 'GET_CART';

export interface AddGameAction {
  type: typeof ADD_GAME;
  gameId: number;
  value: number;
  payload: {
    id?: number;
    userId?: number;
    gameId?: number;
    quantity: number;
  };
}

export interface IncrementGameRequestAction {
  type: typeof INCREMENT_GAME_REQUEST;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId?: number;
    gameId: number;
    quantity: number;
  };
}

export interface IncrementGameSuccessAction {
  type: typeof INCREMENT_GAME_SUCCESS;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
  };
}

export interface RemoveGameRequestAction {
  type: typeof REMOVE_GAME_REQUEST;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
  };
}

export interface RemoveGameSuccessAction {
  type: typeof REMOVE_GAME_SUCCESS;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
  };
}

export interface DecrementGameRequestAction {
  type: typeof DECREMENT_GAME_REQUEST;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
  };
}

export interface DecrementGameSuccessAction {
  type: typeof DECREMENT_GAME_SUCCESS;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
  };
}

export interface GetCartAction {
  type: typeof GET_CART;
  payload: {
    id?: number;
    userId?: number;
    gameId?: number;
    quantity?: number;
  };
}

export interface ClearCartAction {
  type: typeof CLEAR_CART;
  payload: {
    id?: number;
    userId?: number;
    gameId?: number;
    quantity?: number;
  };
}

export type CartActionTypes =
  | AddGameAction
  | RemoveGameRequestAction
  | RemoveGameSuccessAction
  | IncrementGameRequestAction
  | IncrementGameSuccessAction
  | DecrementGameRequestAction
  | DecrementGameSuccessAction
  | ClearCartAction
  | GetCartAction;

export interface CartState {
  cart: {
    cart: {
      id: number;
      gameId: number;
      userId: number;
      quantity: number;
      game: {
        id: number;
        name: string;
        price: number;
        image: string;
        disk: boolean;
        digital: boolean;
      };
    }[];
  };
}
