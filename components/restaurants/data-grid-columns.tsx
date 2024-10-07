import React, { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditRestaurantModal from './EditRestaurantModal';
import DeleteRestaurantModal from './DeleteRestaurantModal';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 2 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => {
      const [editOpen, setEditOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);

      const handleEdit = () => {
        setEditOpen(true);
      };

      const handleDelete = () => {
        setDeleteOpen(true);
      };

      return (
        <div>
          <IconButton onClick={handleEdit} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <DeleteIcon />
          </IconButton>
          {/* Edit Modal */}
          <EditRestaurantModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            restaurant={params.row}
          />
          {/* Delete Confirmation Modal */}
          <DeleteRestaurantModal
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            restaurantId={params.row.id}
          />
        </div>
      );
    },
  },
];

export default columns;
