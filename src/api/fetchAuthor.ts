import axios from 'axios';

export const fetchAuthor = (id?: string) => {
  return axios.get(`/author/${id}`);
};

export const fetchAllAuthors = () => {
  return axios.get('/author/');
};
