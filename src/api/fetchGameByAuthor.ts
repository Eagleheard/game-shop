import axios from 'axios';

export const fetchGameByAuthor = (id?: string) => {
  return axios.get(`/game/?authorId=${id}`);
};
