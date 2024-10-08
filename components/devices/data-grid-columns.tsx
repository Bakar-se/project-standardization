import React, { useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
// import EditDeviceModal from './EditDeviceModal';
// import DeleteDeviceModal from './DeleteDeviceModal';

// Define the type for your row data
interface DeviceRow {
  id: number;
  device_name: string;
  device_id: string;
  device_type: string;
  status: string;
  restaurant: {
    id: number;
    name: string;
  };
}

// Define columns for the device model
const columns: GridColDef<DeviceRow>[] = [
  { field: 'device_name', headerName: 'Device Name', flex: 2 },
  { field: 'device_id', headerName: 'Device ID', flex: 2 },
  { field: 'device_type', headerName: 'Device Type', flex: 1 },
  {
    field: 'restaurant_name',
    headerName: 'Restaurant',
    flex: 2,
    valueGetter: (params) => params.row.restaurant.name, // Properly type valueGetter
  },
  { field: 'status', headerName: 'Status', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params: GridRenderCellParams<DeviceRow>) => {  // Correctly typing `params`
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
          {/* Uncomment Modals when using */}
          {/* <EditDeviceModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            device={params.row} // Pass entire device row data
          /> */}
          {/* <DeleteDeviceModal
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            deviceId={params.row.id} // Pass device ID
          /> */}
        </div>
      );
    },
  },
];

export default columns;
