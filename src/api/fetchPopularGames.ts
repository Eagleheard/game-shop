import axios from 'axios';

export const fetchPopularGames = () => {
  return axios.get('/game?order=popularity');
};
