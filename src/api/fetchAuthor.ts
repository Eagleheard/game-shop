import axios from 'axios';

import { IAuthor } from 'types/interfaces';

export const fetchAuthor = (id?: string) => {
  return axios.get(`/author/${id}`);
};
