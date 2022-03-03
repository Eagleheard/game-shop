import axios from 'axios';

export const fetchGenres = async () => {
  try {
    const { data } = await axios.get('http://localhost:7000/api/genre/getall');
    return data;
  } catch (err) {
    throw err;
  }
};
