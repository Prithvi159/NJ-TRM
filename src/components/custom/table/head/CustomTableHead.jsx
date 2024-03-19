import React, { useState } from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  TextField,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import "./CustomTableHead.scss";
import TIME_Logo from "../../../../assets/images/Group 6726.png";

function FilterTextField({ accessorKey, onChange }) {
  return (
    <TextField
      className="filter-textbox"
      size="small"
      onChange={(e) => onChange(accessorKey, e.target.value)}
    />
  );
}

function SortableHeaderCell(props) {
  const {
    headCell,
    order,
    orderBy,
    onRequestSort,
    createSortHandler,
    onChange,
  } = props;

  return (
    
    <TableCell
      align={headCell.numeric ? "right" : "left"}
      padding={headCell.disablePadding ? "none" : "normal"}
      sortDirection={orderBy === headCell.accessorKey ? order : false}
      className="custom-table-cell"
    >
      {(!headCell.isSearchable) ? (
        <span>{headCell.label}</span>
      ) : (
        
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
          <div className="position"><img src ={TIME_Logo}/></div>
            <span>{headCell.label}</span>
            {headCell.isSortable && (
              <TableSortLabel
                active={orderBy === headCell.accessorKey}
                direction={orderBy === headCell.accessorKey ? order : "asc"}
                onClick={createSortHandler(headCell.accessorKey)}
              >
                <Box component="span" sx={visuallyHidden}style={{ color:"red"}}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              </TableSortLabel>
            )}
          </div>
          <FilterTextField
            accessorKey={headCell.accessorKey}
            onChange={onChange}
          />
        </div>
      )}
    </TableCell>
  );
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columnHeaders,
    onFilterChange,
    displaySelectRowsHeaderCheckBox,
  } = props;
  const [filters, setFilters] = useState({});

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleFilterChange = (column, value) => {
    const updatedFilters = {
      ...filters,
      [column]: value,
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <TableHead className="custom-table-header">
      <TableRow>
        {displaySelectRowsHeaderCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {columnHeaders?.length &&
          columnHeaders.map((headCell) => (
            <SortableHeaderCell
              key={headCell.accessorKey}
              headCell={headCell}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
              createSortHandler={createSortHandler}
              onChange={handleFilterChange}
            />
          ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
