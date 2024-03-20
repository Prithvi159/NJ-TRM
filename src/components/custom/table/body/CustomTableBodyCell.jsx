import React from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import PopoverButton from "../../controls/PopoverButton/PopoverButton";

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
              handleActionClick(action?.actionType, row);
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

export default function CustomTableBodyCell({
  headCell,
  row,
  handleEdit,
  handleDelete,
}) {
  const handleActionClick = (action, row) => {
    switch (action) {
      case "EDIT":
        handleEdit(row);
        break;
      case "DELETE":
        handleDelete(row.id);
        break;
      default:
        break;
    }
  };

  return (
    <TableCell
      align={headCell.numeric ? "right" : "left"}
      padding="none"
      className="custom-table-cell-body"
    >
      {headCell.isActionsEnabled ? (
        <ActionButtons
          actions={headCell?.actionsList}
          row={row}
          handleActionClick={handleActionClick}
        />
      ) : (
        <TableCellContent
          headCell={headCell}
          value={row[headCell?.accessorKey]}
        />
      )}
    </TableCell>
  );
}
