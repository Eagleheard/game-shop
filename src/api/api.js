import axios from 'axios';

export const fetchData = async () => {
  try {
    const { data } = await axios('./store.json');
    return data;
  } catch (err) {
    console.log(err);
  }
};
