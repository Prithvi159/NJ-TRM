import React from "react";
import { IconButton, TableCell } from "@mui/material";
import EditIcon from "../../../../assets/icons/EditIcon";
import TrashIcon from "../../../../assets/icons/TrashIcon";
import "../CustomTable.scss";

const TableCellContent = (props) => {
  const { headCell, value } = props;

  if (headCell?.isDollarSymbolRequired) {
    return `$ ${value}`;
  }
  return value;
};

const ActionButtons = (props) => {
  const { actionsList, row, handleEdit, handleDelete } = props;

  return (
    <>
      {actionsList.map((action, index) => {
        switch (action) {
          case "EDIT":
            return (
              <IconButton
                key={`${row.id}-edit-${index}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleEdit(row);
                }}
              >
                <EditIcon />
              </IconButton>
            );
          case "DELETE":
            return (
              <IconButton
                key={`${row.id}-delete-${index}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(row.id);
                }}
              >
                <TrashIcon />
              </IconButton>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export function CustomTableBodyCell(props) {
  const { headCell, row, handleEdit, handleDelete } = props;

  return (
    <>
      <TableCell
        align={headCell.numeric ? "right" : "left"}
        padding="none"
        className="custom-table-cell-body"
      >
        {headCell.isActionsEnabled ? (
          <ActionButtons
            actionsList={headCell.actionsList}
            row={row}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <TableCellContent
            headCell={headCell}
            value={row[headCell?.accessorKey]}
          />
        )}
      </TableCell>
    </>
  );
}
