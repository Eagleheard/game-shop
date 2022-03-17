import axios from 'axios';

export const fetchGameByAuthor = async (id?: string) => {
  try {
    return await axios.get(`/game/?authorId=${id}`);
  } catch (err) {
    throw err;
  }
};
