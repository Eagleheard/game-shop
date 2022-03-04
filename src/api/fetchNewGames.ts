import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchNewGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('http://localhost:7000/api/game/?isNew=true');
    return data;
  } catch (err) {
    throw err;
  }
};
