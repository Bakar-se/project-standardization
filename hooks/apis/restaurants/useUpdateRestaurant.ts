import { useMutation } from 'react-query';
import axios from 'axios';

export const useUpdateRestaurant = () => {
  return useMutation(async ({ id, data }: { id: number; data: { name: string } }) => {
    const response = await axios.put(`/api/restaurants/updateRestaurants/${id}`, data);
    return response.data;
  });
};
