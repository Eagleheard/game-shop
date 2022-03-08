import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGame = async (id?: string): Promise<IGame[]> => {
  try {
    const { data } = await axios.get(`http://localhost:7000/api/game/${id}`);
    return [data];
  } catch (err) {
    throw err;
  }
};
