import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGames = async (page: number, limit: number, params?: object) => {
  try {
    return await axios.get(`/game/?page=${page}&limit=${limit}`, params);
  } catch (err) {
    throw err;
  }
};
