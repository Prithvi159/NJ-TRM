import React from "react";
import {
  TextField,
  Checkbox,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";

export function Input(props) {
  const { type, name, value, onChange, options } = props;

  const renderInput = () => {
    switch (type) {
      case "text": case "number": case "email": case "password": case "date":
        return (
          <TextField
            type={type}
            label={name}
            name={name}
            value={value}
            onChange={onChange}
          />
        );

      case "select":
        return (
          <Select value={value} onChange={onChange} label={name}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );

      case "checkbox":
        return <Checkbox name={name} checked={value} onChange={onChange} />;

      case "radio":
        return (
          <RadioGroup name={name} value={value} onChange={onChange}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  return (
    renderInput()
  );
}
