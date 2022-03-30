import axios from 'axios';

interface ICart {
  gameId?: number;
  value?: number;
}

export const getBasket = () => {
  return axios.get(`/basket`);
};

export const addGameToBasket = ({ gameId, value }: ICart) => {
  return axios.post(`/basket`, { gameId, value });
};

export const decrementGameFromBasket = ({ gameId, value }: ICart) => {
  return axios.put(`/basket`, { gameId, value });
};

export const removeGameFromBasket = (gameId: ICart) => {
  return axios.delete(`/basket:${gameId}`);
};

export const clearBasket = () => {
  return axios.delete(`/basket/`);
};
