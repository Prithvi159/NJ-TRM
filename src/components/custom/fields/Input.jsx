import React from "react";
import {
  TextField,
  Checkbox,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./Input.scss";
import CalendarIcon from "../../../assets/icons/CalenderIcon";

export function Input(props) {
  const { type, name, value, handleInputChange, options, handleDateChange, label} =
    props;
  console.log(name, value);
  const renderInput = () => {
    switch (type) {
      case "text":
      case "number":
      case "email":
        return (
          <TextField
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={handleInputChange}
            variant="outlined"
            className="custom-textfield"
          />
        );

      case "select":
        return (
          <FormControl variant="outlined" fullWidth className="custom-select">
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              value={value || ""}
              onChange={handleInputChange}
              label={label}
              name={name}
              labelId={`${name}-label`}
              id={name}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={label}
                value={value || null}
                name={name}
                onChange={(newValue) => handleDateChange(name, newValue)}
                slots={{ openPickerIcon: CalendarIcon }}
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
              />
          </LocalizationProvider>
        );

      case "checkbox":
        return (
          <Checkbox name={name} checked={value} onChange={handleInputChange} />
        );

      case "radio":
        return (
          <FormControl>
            <FormLabel>{name}</FormLabel>
            <RadioGroup
              row
              name={name}
              value={value || ""}
              onChange={handleInputChange}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      default:
        return null;
    }
  };

  return renderInput();
}
