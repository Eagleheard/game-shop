import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGames = async (page: number, limit: number) => {
  try {
    return await axios.get(`/game/?page=${page}&limit=${limit}`);
  } catch (err) {
    throw err;
  }
};
