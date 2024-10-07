import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePostRestaurant } from '@/hooks/apis/restaurants/usePostRestaurants';
import { useQueryClient } from 'react-query';

interface ApiError {
  message: string;
}

const AddRestaurantModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: addRestaurant, isLoading, error } = usePostRestaurant();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Restaurant name is required'),
    }),
    onSubmit: (values) => {
      addRestaurant(values, {
        onSuccess: () => {
          queryClient.invalidateQueries('restaurants');
          formik.resetForm();
          handleClose();
        },
        onError: (err: unknown) => {
          console.error('Error adding restaurant:', err);
        },
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ mb: 2 }} variant="contained" onClick={handleClickOpen}>
        Add Restaurant
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Restaurant</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              paddingTop: 2,
              height: 150,
              width: 500,
            }}
          >
            <TextField
              label="Restaurant Name"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            onClick={() => formik.handleSubmit()} // Manually trigger form submission here
          >
            {isLoading ? 'Adding...' : 'Add Restaurant'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRestaurantModal;
