import axios, { AxiosRequestConfig } from 'axios';

import { IParams } from 'types/interfaces';

export const fetchGames = (page: number, limit: number, params?: AxiosRequestConfig<IParams>) => {
  return axios.get(`/game/?page=${page}&limit=${limit}`, params);
};
