import React from "react";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { CustomTableBodyCell } from "./CustomTableBodyCell";
import './CustomTableBody.scss'

export function CustomTableBody(props) {
  const {
    visibleRows,
    isSelected,
    handleCheckboxClick,
    columnHeaders,
    handleRowClick,
    expandedRow,
    dense,
    displaySelectRowsCheckBox,
    rowsPerPage,
    handleEdit, handleDelete,
    isRowExpandable
  } = props;

  const emptyRows = Math.max(0, rowsPerPage - visibleRows.length);
  const colSpan = columnHeaders.length + (displaySelectRowsCheckBox ? 1 : 0);

  return (
    <>
      {visibleRows?.map((row, index) => (
        <React.Fragment key={row.id}>
          <TableRow
            hover
            onClick={() => handleRowClick(row.id)}
            className={`custom-table-row ${isRowExpandable ? 'expandable' : ''} ${expandedRow === row.id ? 'expanded' : ''}`}
            role="checkbox"
            aria-checked={isSelected(row.id)}
            tabIndex={-1}
            selected={isSelected(row.id)}
          >
            {/*checkbox column*/}
            {displaySelectRowsCheckBox && (
              <TableCell
                padding="checkbox"
                onClick={(event) => handleCheckboxClick(event, row.id)}
              >
                <Checkbox color="primary" checked={isSelected(row.id)} />
              </TableCell>
            )}
            {/*table cells for each column */}
            {columnHeaders?.map((headCell) => (
                <CustomTableBodyCell
                    key={headCell?.accessorKey}
                    headCell={headCell}
                    row={row}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                /> 
            ))}
          </TableRow>
          {/*expanded row*/}
          {isRowExpandable && expandedRow === row.id && (
            <TableRow>
              <TableCell colSpan={colSpan}>
                {/*additional details*/}
                <Box p={3}>Additional details - {row.name}</Box>
              </TableCell>
            </TableRow>
          )}
        </React.Fragment>
      ))}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={columnHeaders.length + 1} />
        </TableRow>
      )}
    </>
  );
}
