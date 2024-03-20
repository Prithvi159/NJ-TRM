import React from "react";
import { IconButton, TableCell } from "@mui/material";
import EditIcon from "../../../../assets/icons/EditIcon";
import DeleteIcon from "../../../../assets/icons/DeleteIcon.jsx";
import "../CustomTable.scss";
import PopoverButton from "../../controls/PopoverButton/PopoverButton";
import TransactionIcon from "../../../../assets/icons/Transaction.jsx";

const TableCellContent = (props) => {
  const { headCell, value } = props;

  if (headCell?.isDollarSymbolRequired) {
    return `$ ${value}`;
  }
  return value;
};

const ActionButtons = (props) => {
  const { actionsList, row, handleEdit, handleDelete, actionButtonsJson } = props;

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
                <DeleteIcon />
              </IconButton>
            );
          case "TRANSACTION":
            return (
              <IconButton
                key={`${row.id}-delete-${index}`}
                onClick={(event) => {
                  event.stopPropagation();
                  // handleDelete(row.id);
                }}
              >
                <TransactionIcon/>
              </IconButton>
            )
          case "POPOVER":
            return (
              <PopoverButton
                popoverJson={actionButtonsJson}
              />
            )
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
            actionButtonsJson={headCell}
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
