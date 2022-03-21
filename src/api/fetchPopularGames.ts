import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPopularGames = (): Promise<IGame[]> => {
  return axios.get('/game?order=popularity');
};
