import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGameByAuthor = async (author: string): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('./store.json');
    console.log(data.filter((el) => data.author === author));
    return data;
  } catch (err) {
    throw err;
  }
};
