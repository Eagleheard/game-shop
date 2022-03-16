import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchNewGames = async () => {
  try {
    return await axios.get('/game/?isNew=true');
  } catch (err) {
    throw err;
  }
};
