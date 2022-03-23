import axios from 'axios';

import { IUser } from './../types/interfaces';

export const Registration = (params: IUser) => {
  return axios.put(`/user/signup`, params, { withCredentials: true });
};

export const Login = (params?: IUser) => {
  return axios.put(`/user/login`, params, {
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
  });
};

export const CheckUser = () => {
  return axios.get(`/user/auth`);
};

export const Logout = () => {
  return axios.put('/user/logout');
};
