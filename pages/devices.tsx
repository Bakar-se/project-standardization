import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const Devices = () => {
  // Sample data
  const [rows, setRows] = useState([
    { id: 1, name: 'John', age: 30, gender: 'Male' },
    { id: 2, name: 'Jane', age: 25, gender: 'Female' },
    { id: 3, name: 'Mike', age: 35, gender: 'Male' },
  ]);

  const [searchText, setSearchText] = useState('');
  const [filterGender, setFilterGender] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 110 },
    { field: 'gender', headerName: 'Gender', width: 150 },
  ];

  const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFilterGender(e.target.value);
  };

  const handleRefresh = () => {
    // Add your logic to refresh the data
    setRows([
      { id: 1, name: 'John', age: 30, gender: 'Male' },
      { id: 2, name: 'Jane', age: 25, gender: 'Female' },
      { id: 3, name: 'Mike', age: 35, gender: 'Male' },
    ]);
    setSearchText('');
    setFilterGender('');
  };

  const filteredRows = rows.filter(
    (row) =>
      (row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.age.toString().includes(searchText)) &&
      (filterGender ? row.gender === filterGender : true)
  );

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
        style={{ marginRight: 16 }}
      />
      <Select
        value={filterGender}
        onChange={handleFilterChange}
        displayEmpty
        variant="outlined"
        size="small"
        style={{ marginRight: 16 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </Select>
      <Button
        variant="outlined"
        size="small"
        startIcon={<RefreshIcon />}
        onClick={handleRefresh}
      >
        Refresh
      </Button>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default Devices;
