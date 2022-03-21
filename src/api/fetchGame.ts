import axios from 'axios';

export const fetchGame = (id?: string) => {
  return axios.get(`/game/${id}`);
};
