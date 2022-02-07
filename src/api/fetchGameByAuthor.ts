import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGameByAuthor = async (author: string): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('./store.json');
    return data.filter(() => data.author === author);
  } catch (err) {
    throw err;
  }
};
