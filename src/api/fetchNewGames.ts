import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchNewGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('http://localhost:7000/api/game/getall');
    return data.filter((game: IGame) => game.new);
  } catch (err) {
    throw err;
  }
};
