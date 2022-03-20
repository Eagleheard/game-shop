import axios, { AxiosRequestConfig } from 'axios';

import { IParams } from 'types/interfaces';

export const fetchGames = async (
  page: number,
  limit: number,
  params?: AxiosRequestConfig<IParams>,
) => {
  try {
    return await axios.get(`/game/?page=${page}&limit=${limit}`, params);
  } catch (err) {
    throw err;
  }
};
