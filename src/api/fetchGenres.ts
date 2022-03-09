import axios from 'axios';

export const fetchGenres = async () => {
  try {
    return await axios.get('/api/genre/');
  } catch (err) {
    throw err;
  }
};
