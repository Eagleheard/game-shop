import axios from 'axios';

export const fetchAchievement = () => {
  return axios.get(`/achievement/`);
};
