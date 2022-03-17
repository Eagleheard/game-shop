import axios from 'axios';

export const fetchAuthor = async (id?: string) => {
  try {
    return await axios.get(`/author/${id}`);
  } catch (err) {
    throw err;
  }
};
