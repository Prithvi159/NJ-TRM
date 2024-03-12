import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function TableHeadCellFilterContainer({ columnHeaders, onFilterChange }) {
  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (columnKey, value) => {
    const newFilterValues = { ...filterValues, [columnKey]: value };
    setFilterValues(newFilterValues);
    onFilterChange(newFilterValues);
  };

  const handleClearFilter = (columnKey) => {
    const newFilterValues = { ...filterValues };
    delete newFilterValues[columnKey];
    setFilterValues(newFilterValues);
    onFilterChange(newFilterValues);
  };

  return (
    <Box className="customTableFilterContainer">
      {columnHeaders.map((headCell) => (
        headCell.type === 'text' && (
          <TextField
            key={headCell.accessorKey}
            variant="outlined"
            margin="normal"
            size="small"
            label={`${headCell.label}`}
            value={filterValues[headCell.accessorKey] || ''}
            onChange={(e) =>
              handleFilterChange(headCell.accessorKey, e.target.value)
            }
            InputProps={{
              endAdornment: filterValues[headCell.accessorKey] && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => handleClearFilter(headCell.accessorKey)}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )
      ))}
    </Box>
  );
}

export default TableHeadCellFilterContainer;
