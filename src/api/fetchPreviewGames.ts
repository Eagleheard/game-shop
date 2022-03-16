import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPreviewGames = async () => {
  try {
    return await axios.get('/game/?isPreview=true');
  } catch (err) {
    throw err;
  }
};
