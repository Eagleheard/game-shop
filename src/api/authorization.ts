import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const Authorization = async (params: object) => {
  try {
    const { data } = await axios.post(`/user/login`, params, { withCredentials: true });
    const { token } = data;
    const user = jwtDecode(token);
    return user;
  } catch (err) {
    throw err;
  }
};
