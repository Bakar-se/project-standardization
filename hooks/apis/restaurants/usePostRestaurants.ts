import { useMutation } from 'react-query';
import axios from 'axios';

interface PostRestaurantData {
  name: string;
}

const postRestaurant = async (data: PostRestaurantData) => {
  const response = await axios.post('/api/restaurants/postRestaurants', data);
  return response.data;
};

export const usePostRestaurant = () => {
  return useMutation(postRestaurant);
};
