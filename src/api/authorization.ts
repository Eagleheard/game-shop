import axios from 'axios';

import { IUser } from './../types/interfaces';

export const Login = async (params: IUser) => {
  try {
    return await axios.put(`/user/login`, params, { withCredentials: true });
  } catch (error) {
    throw error;
  }
};
