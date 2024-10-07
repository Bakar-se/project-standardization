import { useMutation } from 'react-query';
import axios from 'axios';

export const useDeleteRestaurant = () => {
  return useMutation(async (id: number) => {
    const response = await axios.delete(`/api/restaurants/deleteRestaurants/${id}`);
    return response.data;
  });
};
