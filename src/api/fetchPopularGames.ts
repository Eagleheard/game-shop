import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPopularGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('http://localhost:7000/api/game/getall');
    return data.sort((a: { popularity: number }, b: { popularity: number }) => {
      return b.popularity - a.popularity;
    });
  } catch (err) {
    throw err;
  }
};
