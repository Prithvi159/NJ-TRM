import React from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import PopoverButton from "../../controls/PopoverButton/PopoverButton";
import './CustomTableBodyCell.scss'

const TableCellContent = (props) => {
  const { headCell, value } = props;

  if (headCell?.isDollarSymbolRequired) {
    return `$ ${value}`;
  }
  return value;
};

const ActionButton = ({ icon, tooltip, onClick }) => {
  return (
    <Tooltip title={tooltip?.text}>
      {icon && (
        <IconButton onClick={onClick}>
          <img src={icon?.url} class="logo" alt={icon?.altText} />
        </IconButton>
      )}
    </Tooltip>
  );
};

const ActionButtons = ({ actions, row, handleActionClick }) => {
  return (
<>
      {actions.map((action, index) => (
        action?.actionType === 'POPOVER' ? (
          <PopoverButton
            key={`${row.id}-${action?.actionType}-${index}`}
            label={action?.label}
            tooltipText={action?.tooltip?.text}
            onClick={(event) => {
              event.stopPropagation();
              handleActionClick(action?.actionType, row, action?.tooltip?.text);
            }}
          />
        ) : (
          <ActionButton
            key={`${row.id}-${action.actionType}-${index}`}
            icon={action.iconDetails}
            tooltip={action.tooltip}
            onClick={(event) => {
              event.stopPropagation();
              handleActionClick(action?.actionType, row);
            }}
          />
        )
      ))}
    </>
  );
};

export default function CustomTableBodyCell(props) {
  const {
    headCell,
    row,
    handleEdit,
    handleDelete,
    handleTransation,
    handleException,
    showIcon
  } = props

  const handleActionClick = (action, row, text) => {
    console.log("action------66--------", action)
    switch (action) {
      case "EDIT":
        handleEdit(row);
        break;
      case "DELETE":
        handleDelete(row.id);
        break;
      case "TRANSACTION":
        handleTransation(row.id);
      break;
      default:
        switch(text){
          case "Exception":
            handleException(row.id);
        }
        break;
    }
  };

  return (
    <TableCell 
      align={headCell.numeric ? "right" : "left"}
      padding="none"
      className={`custom-table-body-cell ${row?.isErrorDutyRecord ? 'error-record' : ''} ${row?.isManuallyAddedDutyRecord ? 'manually-added-record' : ''}`}
    >
      {headCell.isActionsEnabled ? (
        <ActionButtons
          actions={headCell?.actionsList}
          row={row}
          handleActionClick={handleActionClick}
        />
      ) : (
        <>
        {showIcon}
        <TableCellContent
          headCell={headCell}
          value={row[headCell?.accessorKey]}
        />
        </>
      )}
    </TableCell>
  );
}
