export const ADD_GAME = 'ADD_GAME';
export const REMOVE_GAME_REQUEST = 'REMOVE_GAME_REQUEST';
export const REMOVE_GAME_SUCCESS = 'REMOVE_GAME_SUCCESS';
export const DECREMENT_GAME_REQUEST = 'DECREMENT_GAME_REQUEST';
export const DECREMENT_GAME_SUCCESS = 'DECREMENT_GAME_SUCCESS';
export const INCREMENT_GAME_REQUEST = 'INCREMENT_GAME_REQUEST';
export const INCREMENT_GAME_SUCCESS = 'INCREMENT_GAME__SUCCESS';
export const CHANGE_QUANTITY_SUCCESS = 'CHANGE_QUANTITY_SUCCESS';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_FAILURE = 'GET_CART_FAILURE';
export const GET_DISCOUNT_SUCCESS = 'GET_DISCOUNT_SUCCESS';
export const GET_DISCOUNT_REQUEST = 'GET_DISCOUNT_REQUEST';
export const GET_DISCOUNT_FAILURE = 'GET_DISCOUNT_FAILURE';

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
  type: typeof CHANGE_QUANTITY_SUCCESS;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
  };
}

export interface GetDiscountRequestAction {
  type: typeof GET_DISCOUNT_REQUEST;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    isLoading?: boolean;
  };
}

export interface GetDiscountSuccessAction {
  type: typeof GET_DISCOUNT_SUCCESS;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    isLoading?: boolean;
  };
}

export interface GetDiscountFailureAction {
  type: typeof GET_DISCOUNT_FAILURE;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    isLoading?: boolean;
  };
}

export interface GetCartRequestAction {
  type: typeof GET_CART_REQUEST;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    isLoading?: boolean;
  };
}

export interface GetCartSuccessAction {
  type: typeof GET_CART_SUCCESS;
  payload: {
    id?: number;
    userId?: number;
    gameId?: number;
    quantity?: number;
  };
}

export interface GetCartFailureAction {
  type: typeof GET_CART_FAILURE;
  payload: {
    id?: number;
    userId?: number;
    gameId?: number;
    quantity?: number;
    error?: string;
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
  | GetCartSuccessAction
  | GetCartFailureAction
  | GetCartRequestAction
  | GetDiscountSuccessAction
  | GetDiscountRequestAction
  | GetDiscountFailureAction;

export interface CartState {
  cartReducer: {
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
    isLoading: boolean;
    error: string;
    achievements: {
      id: number;
      isAchieved: boolean;
      achievement: {
        name: string;
        description: string;
        discount: number;
      };
    }[];
  };
}
