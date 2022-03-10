import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGame = async (id?: string): Promise<IGame[]> => {
  try {
    const { data } = await axios.get(`/game/${id}`);
    return [data];
  } catch (err) {
    throw err;
  }
};
