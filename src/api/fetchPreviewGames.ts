import axios from 'axios';

export const fetchPreviewGames = () => {
  return axios.get('/game/?isPreview=true');
};
