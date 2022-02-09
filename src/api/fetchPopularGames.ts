import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPopularGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('./store.json');
    return data.sort((a: { popularity: number }, b: { popularity: number }) => {
      return b.popularity - a.popularity;
    });
  } catch (err) {
    throw err;
  }
};
