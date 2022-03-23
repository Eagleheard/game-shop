import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPreviewGames = () => {
  return axios.get('/game/?isPreview=true');
};
