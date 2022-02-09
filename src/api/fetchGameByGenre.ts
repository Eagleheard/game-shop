import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGameByGenre = async (genre: string): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('./store.json');
    return data.filter((game: { genre: string }) => game.genre === genre);
  } catch (err) {
    throw err;
  }
};
