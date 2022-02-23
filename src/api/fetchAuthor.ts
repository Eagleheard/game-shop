import axios from 'axios';

import { IAuthor } from 'types/interfaces';

export const fetchAuthor = async (name?: string): Promise<IAuthor[]> => {
  try {
    const { data } = await axios.get('./authorStore.json');
    return data.filter((author: { name: string }) => author.name === name);
  } catch (err) {
    throw err;
  }
};
