import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  ADD_GAME,
  AddGameAction,
  REMOVE_GAME,
  RemoveGameAction,
  DecrementGameAction,
  DECREMENT_GAME,
  GET_CART,
  CLEAR_CART,
} from 'store/cart/types';
import {
  addGameToBasket,
  clearBasket,
  decrementGameFromBasket,
  getBasket,
  removeGameFromBasket,
} from 'api/fetchCart';
import { addGame, clearCart, decrementGame, getCart, removeGame } from '../actions';

function* addGameToStore({ gameId, value }: AddGameAction) {
  try {
    const { data } = yield call(addGameToBasket, { gameId, value });
    yield put(addGame(data));
  } catch (e) {
    console.log(e);
  }
}

function* decrementGameFromStore({ gameId, value }: DecrementGameAction) {
  try {
    const { data } = yield call(decrementGameFromBasket, { gameId, value });
    yield put(decrementGame(data));
  } catch (e) {
    console.log(e);
  }
}

function* removeGameFromStore({ gameId }: RemoveGameAction) {
  try {
    const { data } = yield call(removeGameFromBasket, { gameId });
    yield put(removeGame(data));
  } catch (e) {
    console.log(e);
  }
}

function* getStore() {
  try {
    const { data } = yield call(getBasket);
    yield put(getCart(data));
  } catch (e) {
    console.log(e);
  }
}

function* clearStore() {
  try {
    const { data } = yield call(clearBasket);
    yield put(clearCart(data));
  } catch (e) {
    console.log(e);
  }
}

export default all([
  takeEvery(ADD_GAME, addGameToStore),
  takeEvery(DECREMENT_GAME, decrementGameFromStore),
  takeEvery(GET_CART, getStore),
  takeEvery(CLEAR_CART, clearStore),
  takeEvery(REMOVE_GAME, removeGameFromStore),
]);
