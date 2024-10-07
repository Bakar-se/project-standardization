import { Box, Typography } from '@mui/material';
import React from 'react';
import { useRestaurants } from '@/hooks/apis/restaurants/useGetRestaurants';
import { DataGrid } from '@mui/x-data-grid';
import columns from '@/components/restaurants/data-grid-columns';
import AddRestaurantModal from '@/components/restaurants/AddRestaurantModal';

interface RestaurantsProps {
    id: number,
    name: string
}

const Restaurants = () => {
  const { data, isLoading, error } = useRestaurants();

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <Box>
        <Typography variant='h3'>Restaurants</Typography>
        <Box textAlign={"right"} ><AddRestaurantModal/></Box>
      <DataGrid
        rows={data as RestaurantsProps[]}
        columns={columns}
        loading={isLoading}
        pagination
      />
    </Box>
  );
};

export default Restaurants;
