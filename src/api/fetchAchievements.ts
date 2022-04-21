import axios from 'axios';

import { IAchievement } from 'types/interfaces';

export const fetchAchievement = () => {
  return axios.get(`/achievement/`);
};

export const claimAchieve = (params: IAchievement) => {
  return axios.put(`/achievement/`, params);
};
