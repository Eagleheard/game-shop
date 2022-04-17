import axios, { AxiosRequestConfig } from 'axios';

import { IOrder } from 'types/interfaces';

export const fetchOrders = (params: AxiosRequestConfig<IOrder>) => {
  return axios.get(`/order/user/`, params);
};

export const createOrder = (params: IOrder) => {
  return axios.post(`/order/`, params);
};
