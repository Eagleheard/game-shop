import axios from 'axios';

export const fetchNewGames = async () => {
  try {
    return await axios.get('/game/?isNew=true');
  } catch (err) {
    throw err;
  }
};
