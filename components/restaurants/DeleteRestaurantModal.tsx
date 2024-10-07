import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useDeleteRestaurant } from '@/hooks/apis/restaurants/useDeleteRestaurant';
import { useQueryClient } from 'react-query';

interface DeleteRestaurantModalProps {
  open: boolean;
  onClose: () => void;
  restaurantId: number;
}

const DeleteRestaurantModal: React.FC<DeleteRestaurantModalProps> = ({ open, onClose, restaurantId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteRestaurant, isLoading } = useDeleteRestaurant();

  const handleDelete = () => {
    deleteRestaurant(restaurantId, {
      onSuccess: () => {
        queryClient.invalidateQueries('restaurants');
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete this restaurant?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error" disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteRestaurantModal;
