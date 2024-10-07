// hooks/useRestaurants.ts
import { useQuery } from 'react-query';
import axios from 'axios';

interface ErrorResponse {
    message: string;
  }

const fetchRestaurants = async () => {
  const { data } = await axios.get('/api/restaurants/getRestaurants');
  return data;
};

export const useRestaurants = () => {
  return useQuery<any, ErrorResponse>(['restaurants'], fetchRestaurants);
};
