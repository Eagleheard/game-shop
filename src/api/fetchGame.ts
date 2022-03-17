import axios from 'axios';

export const fetchGame = async (id?: string) => {
  try {
    return await axios.get(`/game/${id}`);
  } catch (err) {
    throw err;
  }
};
