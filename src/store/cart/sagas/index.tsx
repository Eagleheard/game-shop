import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { socket } from 'config';

import {
  DECREMENT_GAME_REQUEST,
  INCREMENT_GAME_REQUEST,
  REMOVE_GAME_REQUEST,
  GET_CART_REQUEST,
  ADD_GAME,
  CLEAR_CART,
  AddGameAction,
  DecrementGameSuccessAction,
  IncrementGameSuccessAction,
  RemoveGameSuccessAction,
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
  changeQuantitySuccess,
  getCartSuccess,
  removeGameSuccess,
  getCartFailure,
} from '../actions';

function* getStore() {
  try {
    const { data } = yield call(getBasket);
    yield put(getCartSuccess(data));
  } catch (e) {
    yield put(getCartFailure(String(e)));
  }
}

function* addGameToStore({ payload }: AddGameAction) {
  try {
    const { data } = yield call(addGameToBasket, { ...payload });
    yield put(addGame(data));
    yield socket.emit('buyingGame', { id: payload.gameId });
  } catch (e) {
    console.log(e);
  }
}

function* decrementGameFromStore({ payload }: DecrementGameSuccessAction) {
  try {
    const { data } = yield call(decrementGameFromBasket, { ...payload });
    yield put(changeQuantitySuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* incrementGameToStore({ payload }: IncrementGameSuccessAction) {
  try {
    const { data } = yield call(incrementGameToBasket, { ...payload });
    yield put(changeQuantitySuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* removeGameFromStore({ payload }: RemoveGameSuccessAction) {
  try {
    const { data } = yield call(removeGameFromBasket, { ...payload });
    yield put(removeGameSuccess(data));
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
  yield takeLeading(GET_CART_REQUEST, getStore);
  yield takeLeading(CLEAR_CART, clearStore);
  yield takeEvery(REMOVE_GAME_REQUEST, removeGameFromStore);
}

export default watcher;
