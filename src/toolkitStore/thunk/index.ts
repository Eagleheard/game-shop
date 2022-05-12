import { AxiosRequestConfig } from 'axios';

import { AdminPanelState } from 'toolkitStore/types';
import {
  IDiscountParams,
  INewAuthorParams,
  INewGameParams,
  IOrderParams,
  IUserParams,
} from 'types/interfaces';
import {
  blockUser,
  createDiscounts,
  createNewAuthor,
  createNewGame,
  getAllOrders,
  getAllUsers,
  updateGame,
} from 'api/adminRequests';
import {
  addDiscountsFailure,
  addDiscountsRequest,
  addNewAuthorFailure,
  addNewAuthorRequest,
  addNewGameFailure,
  addNewGameRequest,
  blockUserFailure,
  blockUserRequest,
  blockUserSuccess,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
  getUsersFailure,
  getUsersRequest,
  getUsersSuccess,
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

export const fetchAllUsers = () => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(getUsersRequest());
    try {
      const { data } = await getAllUsers();
      dispatch(getUsersSuccess(data));
    } catch (error) {
      dispatch(getUsersFailure(error));
    }
  };
};

export const blockCurrentUser = (params: AxiosRequestConfig<IUserParams>) => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(blockUserRequest());
    try {
      const { data } = await blockUser(params);
      dispatch(blockUserSuccess(data));
    } catch (error) {
      dispatch(blockUserFailure(error));
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
