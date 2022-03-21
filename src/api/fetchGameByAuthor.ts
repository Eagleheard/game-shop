import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGameByAuthor = (id?: string): Promise<IGame[]> => {
  return axios.get(`/game/?authorId=${id}`);
};
