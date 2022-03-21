import axios from 'axios';

import { IAuthor } from 'types/interfaces';

export const fetchAuthor = (id?: string): Promise<IAuthor[]> => {
  return axios.get(`/author/${id}`);
};
