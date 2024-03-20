import React from "react";
import {
  Box,
  Pagination,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import './CustomPagination.scss'

const CustomPagination = (props) => {
  const {
    count,
    page,
    onChangePage,
    rowsPerPage,
    onChangeRowsPerPage,
    rowsPerPageOptions,
  } = props;

  const numPages = count && rowsPerPage && Math.ceil(count / rowsPerPage);

  const minRowsPerPageOption = rowsPerPageOptions?.length && Math.min(...rowsPerPageOptions);

  const handleChangePage = (event, newPage) => {
    onChangePage(event, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onChangeRowsPerPage(event);
  };

  return (
    <Box className="custom-pagination-container">
      <Box className="custom-pagination-controls">
        <Typography variant="body2" className="pagination-text">Show</Typography>
        
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          disabled={count < minRowsPerPageOption}
          autoWidth
          className="pagination-select"
        >
          {rowsPerPageOptions?.length && rowsPerPageOptions.map((rowOption) => (
            <MenuItem
              key={rowOption}
              value={rowOption}
              disabled={rowOption > count}
            >
              {rowOption}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2" className="pagination-text">Entriess</Typography>
      </Box>
      <Pagination
        count={numPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size="small"
        disabled={count === 0 || numPages <= 1}
        // variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};
export default CustomPagination;
