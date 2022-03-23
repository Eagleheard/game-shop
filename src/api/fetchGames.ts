import axios from 'axios';

export const fetchGames = (page: number, limit: number) => {
  return axios.get(`/game/?page=${page}&limit=${limit}`);
};
