import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGameByAuthor = async (id?: string): Promise<IGame[]> => {
  try {
    const { data } = await axios.get(`/game/?authorId=${id}`);
    return data;
  } catch (err) {
    throw err;
  }
};
