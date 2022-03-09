import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPreviewGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('/game/?isPreview=true');
    return data;
  } catch (err) {
    throw err;
  }
};
