import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGames = async (page: number, limit: number, params?: object) => {
  try {
    const { data } = await axios.get(`/game/?page=${page}&limit=${limit}`, params);
    return data.rows;
  } catch (err) {
    throw err;
  }
};
