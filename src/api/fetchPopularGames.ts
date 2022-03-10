import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPopularGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('/game?order=popularity');
    return data;
  } catch (err) {
    throw err;
  }
};
