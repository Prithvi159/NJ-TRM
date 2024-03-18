import React from "react";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { CustomTableBodyCell } from "./CustomTableBodyCell";
import './CustomTableBody.scss'
import RowDetailsPanel from "./RowDetailsPanel";

export function CustomTableBody(props) {
  const {
    visibleRows,
    isSelected,
    handleCheckboxClick,
    columnHeaders,
    handleRowClick,
    expandedRow,
    displaySelectRowsCheckBox,
    handleEdit, handleDelete,
    isRowExpandable,
    expandedRowDetailPanelJson
  } = props;
  
  const colSpan = columnHeaders.length + (displaySelectRowsCheckBox ? 1 : 0);

  return (
    <>
      {visibleRows?.length && visibleRows?.map((row, index) => (
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
            <TableRow className="expanded-row-detail-panel-container">
              <TableCell colSpan={colSpan}>
                {/*additional details*/}
                <RowDetailsPanel data={row?.additionalUserDetails} 
                  expandedRowDetailPanelJson={expandedRowDetailPanelJson}/>
              </TableCell>
            </TableRow>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
