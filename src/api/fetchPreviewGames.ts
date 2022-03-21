import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPreviewGames = (): Promise<IGame[]> => {
  return axios.get('/game/?isPreview=true');
};
