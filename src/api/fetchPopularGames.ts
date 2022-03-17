import axios from 'axios';

export const fetchPopularGames = async () => {
  try {
    return await axios.get('/game?order=popularity');
  } catch (err) {
    throw err;
  }
};
