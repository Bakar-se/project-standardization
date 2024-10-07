import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateRestaurant } from '@/hooks/apis/restaurants/useUpdateRestaurant';
import { useQueryClient } from 'react-query';

interface EditRestaurantModalProps {
  open: boolean;
  onClose: () => void;
  restaurant: { id: number; name: string };
}

const EditRestaurantModal: React.FC<EditRestaurantModalProps> = ({ open, onClose, restaurant }) => {
  const queryClient = useQueryClient();
  const { mutate: updateRestaurant, isLoading } = useUpdateRestaurant();

  const formik = useFormik({
    initialValues: {
      name: restaurant.name || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Restaurant name is required'),
    }),
    onSubmit: (values) => {
      updateRestaurant(
        { id: restaurant.id, data: values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('restaurants');
            onClose();
          },
        }
      );
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Restaurant</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Restaurant Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button
          onClick={() => formik.handleSubmit()} // Wrap formik.handleSubmit in an anonymous function
          variant="contained"
          color="primary"
          disabled={isLoading || !formik.isValid}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRestaurantModal;
