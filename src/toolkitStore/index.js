import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import adminPanelReducer from 'toolkitStore/slices';
import { cartReducer } from 'store/cart/reducers';
import rootSaga from 'store/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  adminPanelReducer,
  cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
