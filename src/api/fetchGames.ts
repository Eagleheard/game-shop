import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGames = (page: number, limit: number): Promise<IGame[]> => {
  return axios.get(`/game/?page=${page}&limit=${limit}`);
};
