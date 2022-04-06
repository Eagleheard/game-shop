import axios from 'axios';

interface ICart {
  gameId?: number;
  value?: number;
}

export const getBasket = () => {
  return axios.get(`/basket`);
};

export const addGameToBasket = ({ gameId, value }: ICart) => {
  return axios.post(`/basket?gameId=${gameId}&value=${value}`);
};

export const decrementGameFromBasket = ({ gameId }: ICart) => {
  return axios.put(`/basket/decrement?gameId=${gameId}`);
};

export const incrementGameToBasket = ({ gameId }: ICart) => {
  return axios.put(`/basket/increment?gameId=${gameId}`);
};

export const removeGameFromBasket = ({ gameId }: ICart) => {
  return axios.delete(`/basket/${gameId}`);
};

export const clearBasket = () => {
  return axios.delete(`/basket/`);
};
