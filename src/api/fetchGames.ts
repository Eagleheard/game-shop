import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchGames = async (page: number, limit: number): Promise<IGame[]> => {
  try {
    const { data } = await axios.get(
      `http://localhost:7000/api/game/getall?page=${page}&limit=${limit}`,
    );
    return data;
  } catch (err) {
    throw err;
  }
};
