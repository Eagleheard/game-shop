import axios from 'axios';

export const fetchGenres = async () => {
  try {
    return await axios.get('http://localhost:7000/api/genre/');
  } catch (err) {
    throw err;
  }
};
