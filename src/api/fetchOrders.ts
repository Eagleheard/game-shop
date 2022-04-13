import axios from 'axios';

export const fetchOrders = () => {
  return axios.get(`/order/user/`);
};
