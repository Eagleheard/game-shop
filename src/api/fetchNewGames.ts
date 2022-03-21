import axios from 'axios';

export const fetchNewGames = () => {
  return axios.get('/game/?isNew=true');
};
