import { IGame } from 'types/interfaces';

export const ADD_GAME = 'ADD_GAME';
export const REMOVE_GAME = 'REMOVE_GAME';
export const DECREMENT_GAME = 'DECREMENT_GAME';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_CART = 'GET_CART';

export interface AddGameAction {
  type: typeof ADD_GAME;
  gameId?: number;
  value?: number;
  payload: [];
}

export interface RemoveGameAction {
  type: typeof REMOVE_GAME;
  gameId?: number;
  payload: [];
}

export interface DecrementGameAction {
  type: typeof DECREMENT_GAME;
  gameId?: number;
  value?: number;
  payload: [];
}

export interface GetCartAction {
  type: typeof GET_CART;
  payload: [];
}

export interface ClearCartAction {
  type: typeof CLEAR_CART;
  payload: [];
}

export type CartActionTypes =
  | AddGameAction
  | RemoveGameAction
  | DecrementGameAction
  | ClearCartAction
  | GetCartAction;

export interface CartStateItem {
  game: IGame;
}

export interface CartState {
  id: number;
  gameId: number;
  userId: number;
  games: CartStateItem[];
  count: number;
}
