import axios from 'axios';

export const fetchGames = async (page: number, limit: number) => {
  try {
    return await axios.get(`/game/?page=${page}&limit=${limit}`);
  } catch (err) {
    throw err;
  }
};
