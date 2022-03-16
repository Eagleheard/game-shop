import axios from 'axios';

import { IAuthor } from 'types/interfaces';

export const fetchAuthor = async (id?: string) => {
  try {
    return await axios.get(`/author/${id}`);
  } catch (err) {
    throw err;
  }
};
