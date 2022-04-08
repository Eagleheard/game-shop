import axios from 'axios';

export const fetchUserInfo = (id?: string) => {
  return axios.get(`/user/${id}`);
};
