import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';

import {
  ADD_GAME,
  AddGameAction,
  DecrementGameSuccessAction,
  GET_CART,
  CLEAR_CART,
  INCREMENT_GAME_REQUEST,
  IncrementGameSuccessAction,
  DECREMENT_GAME_REQUEST,
  RemoveGameSuccessAction,
  REMOVE_GAME_REQUEST,
} from 'store/cart/types';
import {
  addGameToBasket,
  clearBasket,
  decrementGameFromBasket,
  getBasket,
  incrementGameToBasket,
  removeGameFromBasket,
} from 'api/fetchCart';
import {
  addGame,
  clearCart,
  decrementGameSuccess,
  getCart,
  incrementGameSuccess,
  RemoveGameSuccess,
} from '../actions';

function* getStore() {
  try {
    const { data } = yield call(getBasket);
    yield put(getCart(data));
  } catch (e) {
    console.log(e);
  }
}

function* addGameToStore({ payload }: AddGameAction) {
  try {
    const { data } = yield call(addGameToBasket, { ...payload });
    yield put(addGame(data));
  } catch (e) {
    console.log(e);
  }
}

function* decrementGameFromStore({ payload }: DecrementGameSuccessAction) {
  try {
    const { data } = yield call(decrementGameFromBasket, { ...payload });
    yield put(decrementGameSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* incrementGameToStore({ payload }: IncrementGameSuccessAction) {
  try {
    const { data } = yield call(incrementGameToBasket, { ...payload });
    yield put(incrementGameSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* removeGameFromStore({ payload }: RemoveGameSuccessAction) {
  try {
    const { data } = yield call(removeGameFromBasket, { ...payload });
    yield put(RemoveGameSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* clearStore() {
  try {
    yield call(clearBasket);
    yield put(clearCart());
  } catch (e) {
    console.log(e);
  }
}

function* watcher() {
  yield takeLeading(ADD_GAME, addGameToStore);
  yield takeEvery(DECREMENT_GAME_REQUEST, decrementGameFromStore);
  yield takeEvery(INCREMENT_GAME_REQUEST, incrementGameToStore);
  yield takeLeading(GET_CART, getStore);
  yield takeLeading(CLEAR_CART, clearStore);
  yield takeEvery(REMOVE_GAME_REQUEST, removeGameFromStore);
}

export default watcher;
