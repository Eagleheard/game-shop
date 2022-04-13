import axios from 'axios';

export const fetchAchievement = () => {
  return axios.get(`/achievement/`);
};

export const claimAchieve = (params: any) => {
  return axios.put(`/achievement/`, params);
};
