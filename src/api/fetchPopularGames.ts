import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPopularGames = async () => {
  try {
    return await axios.get('/game?order=popularity');
  } catch (err) {
    throw err;
  }
};
