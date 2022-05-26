import axios, { AxiosRequestConfig } from 'axios';

import {
  IDiscountParams,
  INewAuthorParams,
  INewGameParams,
  IOrderParams,
  IUserParams,
} from 'types/interfaces';

export const uploadGamePhoto = (formData: FormData) => {
  return axios.post('https://api.cloudinary.com/v1_1/game-shop/image/upload', formData);
};

export const getAllOrders = ({
  params,
}: AxiosRequestConfig<IOrderParams | AxiosRequestConfig<IOrderParams> | undefined>) => {
  return axios.get('/order/admin', params);
};

export const createNewGame = (params: INewGameParams) => {
  return axios.post('/game/', params);
};

export const updateGame = (params: INewGameParams) => {
  return axios.put(`/game/${params.id}`, params);
};

export const createNewAuthor = (params: INewAuthorParams) => {
  return axios.post('/author/', params);
};

export const createDiscounts = (params: IDiscountParams) => {
  return axios.post('/discount/', params);
};

export const getAllUsers = () => {
  return axios.get('/user');
};

export const blockUser = ({ params }: AxiosRequestConfig<IUserParams>) => {
  return axios.put(`/user/block/${params.id}`, params);
};

export const deleteGame = (id: number) => {
  return axios.delete(`/game/${id}`);
};
