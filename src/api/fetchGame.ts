import axios from 'axios';

import { ICommentParams } from 'types/interfaces';

export const fetchGame = (id?: string) => {
  return axios.get(`/game/${id}`);
};

export const fetchGameComments = (id: number, page: number, limit: number) => {
  return axios.get(`/comments/${id}/?page=${page}&limit=${limit}`);
};

export const sendComment = (params: ICommentParams) => {
  return axios.post(`/comments/${params.id}`, params);
};
