import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchNewGames = (): Promise<IGame[]> => {
  return axios.get('/game/?isNew=true');
};
