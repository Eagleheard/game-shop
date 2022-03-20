import axios from 'axios';

import { IUser } from './../types/interfaces';

export const Registration = async (params: IUser) => {
  try {
    return await axios.put(`/user/signup`, params, { withCredentials: true });
  } catch (error) {
    throw error;
  }
};
