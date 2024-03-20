import React, { useState, useMemo } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/system";
import CustomPagination from "../CustomPagination";
import "./CustomTable.scss";
import TableRowEditModal from "../modal/EditModal";
import CustomTablePdfExporter from "./pdfExporter/CustomTablePdfExporter";
import EnhancedTableHead from "./head/CustomTableHead";
import { useUpdateUserTableData } from "../../../utils/TanstackQuery/tableHelper";
import { CustomTableBody } from "./body/CustomTableBody";
import AlertModal from "../modal/alertModal/AlertModal";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function descendingDateComparator(a, b, orderBy) {
  const dateA = new Date(a[orderBy]);
  const dateB = new Date(b[orderBy]);

  if (dateB < dateA) {
    return -1;
  }
  if (dateB > dateA) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy, columnHeaders) {
  const column = columnHeaders.find((header) => header.accessorKey === orderBy);

  if (column?.type === 'date') {
    return order === 'desc'
      ? (a, b) => descendingDateComparator(a, b, orderBy)
      : (a, b) => -descendingDateComparator(a, b, orderBy);
  }

  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableToolbar(props) {
  const { actionButtons, numSelected, onPrint } = props;
  console.log("actionButtons",actionButtons)

  const handleActionClick = (action) => {
    switch (action) {
      case "print":
        onPrint(true);
        break;
      case "exportCSV":
        // Implement export as CSV functionality
        break;
      default:
        break;
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}
      <div>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        ) : (
        <>
        {actionButtons?.length && actionButtons.map((button, index) => (
          <Tooltip key={index} title={button?.tooltip?.text}>
            <IconButton
              aria-label={button?.tooltip?.text}
              onClick={() => handleActionClick(button?.action)}
            >
              {button?.iconDetails && <img src={button?.iconDetails?.url} alt={button?.iconDetails?.altText} />}
            </IconButton>
          </Tooltip>
        ))}
        </>
        )}
      </div>
    </Toolbar>
  );
}

const getInitialOrderBy = (columnHeaders) => {
  const defaultColumn = columnHeaders?.length && columnHeaders.find((column) => column.defaultSortBy);
  return defaultColumn ? defaultColumn.accessorKey : "calories";
};

export default function CustomTable(props) {
    const { rows, columnHeaders, toolBar, pagination, displaySelectRowsCheckBox, isRowExpandable, modals, 
      expandedRowDetailPanelJson } = props;

  // Determine the maximum rows per page option based on the maximum value in rowsPerPageOptions
  const maxRowsPerPageOption = pagination && Math.max(...pagination?.rowsPerPageOptions);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(getInitialOrderBy(columnHeaders));
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [printMode, setPrintMode] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  //Modal States
  const [rowDataForEdit, setRowDataForEdit] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //custom RQ Hooks
  const { mutate } = useUpdateUserTableData();


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }

    setSelected(newSelected);
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    handleClick(event, id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = Math.floor(((page - 1) * rowsPerPage) / newRowsPerPage) + 1; // Calculate new page
    setRowsPerPage(newRowsPerPage);
    setPage(newPage);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - (page - 1) * rowsPerPage);

  const visibleRows = useMemo(
    () =>
      filteredRows?.length &&
      stableSort(filteredRows, getComparator(order, orderBy, columnHeaders)).slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      ),
    [filteredRows, order, orderBy, page, rowsPerPage]
  );

  const handleEdit = (row) => {
    setRowDataForEdit(row);
    setOpenEditModal(true);
  };

  const handleDelete = (id) => {
    setOpenDeleteModal(true)
    //Delete logic contd...
  };

  const handleSaveEditedRowData = (editedRowData) => {
    mutate(editedRowData);
    console.log("Saving edited data:", editedRowData);
    setOpenEditModal(false);
  };

  const renderEditModal = () => {
    return (
      <TableRowEditModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        rowData={rowDataForEdit}
        onSave={handleSaveEditedRowData}
        columns={columnHeaders}
      />
    );
  };
  const renderDeleteModal = () => {
    return (
      <AlertModal
        modalData={modals.deleteUser}
        onSecondaryButtonClick={() => {setOpenDeleteModal(false)}}
        onPrimaryButtonClick={() => {}}
      />
    )  
  };

  const handleFilterChange = (filterValues) => {
    let filteredData = rows;
    Object.keys(filterValues).forEach((key) => {
      // Check filter value empty
      if (filterValues[key].trim() !== "") {
        filteredData = filteredData.filter((row) =>
          row[key].toLowerCase().includes(filterValues[key].toLowerCase())
        );
      }
    });

    // If no filters are applied (all filter values are empty), reset to initial data
    const isAllFilterFldsEmpty = Object.values(filterValues).every(
      (value) => value.trim() === ""
    );
    if (isAllFilterFldsEmpty) {
      filteredData = rows;
    }

    setFilteredRows(filteredData);
  };

  const handlePrint = (triggerPrintWindow) => {
    setPrintMode(triggerPrintWindow);
  };

  const renderPdfExporter = () => {
    if (printMode) {
      return (
        <CustomTablePdfExporter
          data={visibleRows}
          columns={columnHeaders}
          open={printMode}
          handlePrintMode={handlePrint}
        />
      );
    }
    return null;
  };

  const renderTableBody = () => {
    return (
      <CustomTableBody
        visibleRows={visibleRows}
        isSelected={isSelected}
        handleCheckboxClick={handleCheckboxClick}
        columnHeaders={columnHeaders}
        handleRowClick={handleRowClick}
        expandedRow={expandedRow}
        isRowExpandable={isRowExpandable}
        displaySelectRowsCheckBox={displaySelectRowsCheckBox}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        expandedRowDetailPanelJson={isRowExpandable ? expandedRowDetailPanelJson : null}
      />
    )
  }

  const handleRowClick = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Collapse row if already expanded
    } else {
      setExpandedRow(id); // Expand row if not expanded
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onPrint={handlePrint}
          actionButtons={toolBar?.actionButtons}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              columnHeaders={columnHeaders}
              onFilterChange={handleFilterChange}
              displaySelectRowsHeaderCheckBox={displaySelectRowsCheckBox}
            />
            <TableBody>
              {renderTableBody()}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          count={rows?.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={pagination?.rowsPerPageOptions}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          maxRowsPerPageOption={maxRowsPerPageOption}
        />
      </Paper>
      {renderPdfExporter()}
      {openEditModal && renderEditModal()}
      {openDeleteModal && renderDeleteModal()}
    </Box>
  );
}
