import { AxiosRequestConfig } from 'axios';

import { AdminPanelState } from 'toolkitStore/types';
import { IDiscountParams, INewAuthorParams, INewGameParams, IOrderParams } from 'types/interfaces';
import {
  createDiscounts,
  createNewAuthor,
  createNewGame,
  getAllOrders,
  updateGame,
} from 'api/adminRequests';
import {
  addDiscountsFailure,
  addDiscountsRequest,
  addNewAuthorFailure,
  addNewAuthorRequest,
  addNewGameFailure,
  addNewGameRequest,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
} from 'toolkitStore/slices';

export const fetchAllOrders = (params: AxiosRequestConfig<IOrderParams>) => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(getOrdersRequest());
    try {
      const { data } = await getAllOrders({ params });
      dispatch(getOrdersSuccess(data));
    } catch (error) {
      dispatch(getOrdersFailure(error));
    }
  };
};

export const addNewGame = (params: INewGameParams) => {
  return async (dispatch: (arg0: { payload: INewGameParams; type: string }) => void) => {
    dispatch(addNewGameRequest(params));
    try {
      createNewGame(params);
    } catch (error) {
      dispatch(addNewGameFailure(error));
    }
  };
};

export const updateSelectedGame = (params: INewGameParams) => {
  return async (dispatch: (arg0: { payload: INewGameParams; type: string }) => void) => {
    dispatch(addNewGameRequest(params));
    try {
      updateGame(params);
    } catch (error) {
      dispatch(addNewGameFailure(error));
    }
  };
};

export const addNewAuthor = (params: INewAuthorParams) => {
  return async (dispatch: (arg0: { payload: INewAuthorParams; type: string }) => void) => {
    dispatch(addNewAuthorRequest(params));
    try {
      createNewAuthor(params);
    } catch (error) {
      dispatch(addNewAuthorFailure(error));
    }
  };
};

export const addDiscounts = (params: IDiscountParams) => {
  return async (dispatch: (arg0: { payload: IDiscountParams; type: string }) => void) => {
    dispatch(addDiscountsRequest(params));
    try {
      createDiscounts(params);
    } catch (error) {
      dispatch(addDiscountsFailure(error));
    }
  };
};
