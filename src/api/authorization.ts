import axios from 'axios';

import { IUser } from './../types/interfaces';

export const registration = (params: IUser) => {
  return axios.put(`/user/signup`, params, { withCredentials: true });
};

export const login = (params?: IUser) => {
  return axios.put(`/user/login`, params, {
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
  });
};

export const authorization = () => {
  return axios.get(`/user/auth`);
};

export const logout = () => {
  return axios.put('/user/logout');
};
