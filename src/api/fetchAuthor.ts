import axios from 'axios';

import { IAuthor } from 'types/interfaces';

export const fetchAuthor = async (id?: string): Promise<IAuthor[]> => {
  try {
    const { data } = await axios.get(`http://localhost:7000/api/author/${id}`);
    return [data];
  } catch (err) {
    throw err;
  }
};
