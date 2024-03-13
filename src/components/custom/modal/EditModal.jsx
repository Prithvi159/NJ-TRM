import React, { useState, useEffect } from "react";
import { Modal, Fade, Grid, Button } from "@mui/material";
import "./EditModal.css";
import { Input } from "../fields/Input";
import { validateField } from "../../../utils/validation";

const TableRowEditModal = (props) => {
  const { open, onClose, rowData, onSave, columns } = props;
  const [editedData, setEditedData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setEditedData(rowData);
    setValidationErrors({});
  }, [rowData]);

  const handleFieldChange = (e, accessorKey) => {
    const { value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [accessorKey]: value,
    }));
    // Clear validation error when user starts editing a field
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [accessorKey]: null,
    }));
  };

  const handleSave = () => {
    const errors = validateFields();
    if (Object.keys(errors).length === 0) {
      onSave(editedData);
      onClose();
    } else {
      setValidationErrors(errors);
    }
  };

  const validateFields = () => {
    const errors = {};
    columns.forEach((column) => {
      const value = editedData[column.accessorKey];
      const columnValidations = column.validations || [];
      const errorMessage = validateField(columnValidations, value);
      if (errorMessage) {
        errors[column.accessorKey] = errorMessage;
      }
    });
    return errors;
  };

  const renderTableRowFields = (columns) => {
    return columns?.map((column) => (
      <Grid item xs={12} key={column.accessorKey}>
        {column.isActionsEnabled ? null : (
          <div>
            <Input
              type={column.type || "text"}
              name={column.label}
              accessorKey={column.accessorKey}
              value={editedData[column.accessorKey] || ""}
              onChange={(e) => handleFieldChange(e, column.accessorKey)}
              options={column.options}
            />
            {validationErrors[column.accessorKey] && (
              <span style={{ color: "red" }}>
                {validationErrors[column.accessorKey]}
              </span>
            )}
          </div>
        )}
      </Grid>
    ));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      <Fade in={open}>
        <div className="modalContainer">
          <h2 id="transition-modal-title">Edit Row</h2>
          <Grid container spacing={2} style={{ padding: "20px" }}>
            {renderTableRowFields(columns)}
          </Grid>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default TableRowEditModal;
