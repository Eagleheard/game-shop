import axios from 'axios';

export const fetchUserInfo = (id?: string) => {
  return axios.get(`/user/${id}`);
};

export const uploadUserPhoto = async (formData: FormData, id?: string) => {
  const { data } = await axios.post(
    'https://api.cloudinary.com/v1_1/game-shop/image/upload',
    formData,
  );
  return await axios.put(`/user/${id}`, { photo: data.url });
};
