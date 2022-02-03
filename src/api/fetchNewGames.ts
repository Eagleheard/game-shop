import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchNewGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('./store.json');
    return data.filter((game: IGame) => game.new);
  } catch (err) {
    throw err;
  }
};
