import axios from 'axios';

export const fetchPreviewGames = async () => {
  try {
    return await axios.get('/game/?isPreview=true');
  } catch (err) {
    throw err;
  }
};
