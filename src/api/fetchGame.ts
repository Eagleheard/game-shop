import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGame = async (id?: string) => {
  try {
    return await axios.get(`/game/${id}`);
  } catch (err) {
    throw err;
  }
};
