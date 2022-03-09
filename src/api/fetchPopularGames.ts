import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPopularGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('/game?isOrder=popularity');
    return data;
  } catch (err) {
    throw err;
  }
};
