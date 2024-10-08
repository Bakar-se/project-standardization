import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import columns from '@/components/devices/data-grid-columns';

const Devices = () => {


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={[]}
        columns={columns}
      />
    </div>
  );
};

export default Devices;
function setRows(arg0: { id: number; name: string; age: number; gender: string; }[]) {
  throw new Error('Function not implemented.');
}

