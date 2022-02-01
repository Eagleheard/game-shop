import axios from 'axios';

import { IGame } from 'types/game';

export const fetchGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('./store.json');
    return data;
  } catch (err) {
    throw err;
  }
};
