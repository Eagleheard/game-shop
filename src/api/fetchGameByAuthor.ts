import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGameByAuthor = async (id?: string): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('http://localhost:7000/api/game/getall');
    return data.filter((game: IGame) => game.author.id === Number(id));
  } catch (err) {
    throw err;
  }
};
