import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGameByAuthor = async (id?: string) => {
  try {
    return await axios.get(`/game/?authorId=${id}`);
  } catch (err) {
    throw err;
  }
};
