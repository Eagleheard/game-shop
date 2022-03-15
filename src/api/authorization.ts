import axios from 'axios';

export const Authorization = async (params: object) => {
  try {
    return await axios.post(`/user/login`, params);
  } catch (err) {
    throw err;
  }
};
