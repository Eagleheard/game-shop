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
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(getOrdersFailure(message));
    }
  };
};

export const fetchAllUsers = () => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(getUsersRequest());
    try {
      const { data } = await getAllUsers();
      dispatch(getUsersSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(getUsersFailure(message));
    }
  };
};

export const blockCurrentUser = (params: AxiosRequestConfig<IUserParams>) => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(blockUserRequest());
    try {
      const { data } = await blockUser(params);
      dispatch(blockUserSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(blockUserFailure(message));
    }
  };
};

export const addNewGame = (params: INewGameParams) => {
  return async (dispatch: (arg0: { payload: INewGameParams; type: string }) => void) => {
    dispatch(addNewGameRequest(params));
    try {
      await createNewGame(params);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(addNewGameFailure(message));
    }
  };
};

export const updateSelectedGame = (params: INewGameParams) => {
  return async (dispatch: (arg0: { payload: INewGameParams; type: string }) => void) => {
    dispatch(addNewGameRequest(params));
    try {
      updateGame(params);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(addNewGameFailure(message));
    }
  };
};

export const addNewAuthor = (params: INewAuthorParams) => {
  return async (dispatch: (arg0: { payload: INewAuthorParams; type: string }) => void) => {
    dispatch(addNewAuthorRequest(params));
    try {
      createNewAuthor(params);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(addNewAuthorFailure(message));
    }
  };
};

export const addDiscounts = (params: IDiscountParams) => {
  return async (dispatch: (arg0: { payload: IDiscountParams; type: string }) => void) => {
    dispatch(addDiscountsRequest(params));
    try {
      createDiscounts(params);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(addDiscountsFailure(message));
    }
  };
};
