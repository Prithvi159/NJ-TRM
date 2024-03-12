import React, { useState } from 'react'
import Logo from '../../assets/images/NJTransitLogo.png'
import { Button, TextField } from '@mui/material'
import LeftArrowIcon from '../../assets/icons/LeftArrow'
import { Link } from 'react-router-dom'
import './forgotPassword.css'
import ForgotPasswordJson from '../../json/ForgotPassword.json'
import { validateField } from '../../utils/validation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const ForgotPassword = () => {

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field, e) => {
    const value = e.target.value;
    const validationError = validateField(field.validations, value);
  
    setFormData((prevData) => ({
      ...prevData,
      [field.name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: validationError,
    }));
  };


  const validateForm = () => {
    const errors = {};
    ForgotPasswordJson.fields.forEach((field) => {
      const validationError = validateField(field?.validations, formData[field.name]);
      if (validationError) {
        errors[field.name] = validationError;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderField = (field) => {
    switch (field.type) {
      case "checkbox":
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                value={field.name}
                color="primary"
                checked={formData[field.name] || false}
                onChange={() =>
                  handleInputChange(field, { target: { value: !formData[field.name] } })
                }
              />
            }
            label={field.label}
          />
        );

      default:
        return (
          <TextField
            key={field.name}
            required={field.required}
            error={Boolean(formErrors[field.name])}
            helperText={formErrors[field.name]}
            id={`outlined-${field.name}`}
            label={field.label}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field, e)}
          />
        );
    }
  };

  const forgotPasswordService = (email) => {
    return axios.post('/njtransit/nodebackend/auth/forgot-password', email)
  }

  const mutation = useMutation({
    mutationFn: () => {
      forgotPasswordService(formData.email)
    },
  })


  function handleRequestResetLinkBtnClick(e) {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log(mutation)
    }

  }

  return (
    <div className="background-image">
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="centered-image">
          <img src={Logo} alt="Centered Image" />
        </div>
        <h2>Forgot Password ?</h2>
        <h3>No Worries, We'll send you reset instraction</h3>
        <form onSubmit={handleRequestResetLinkBtnClick} noValidate>
          {ForgotPasswordJson.fields.map(renderField)}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Request Reset Link
          </Button>
          <Link to="/login">
              <Button startIcon={<LeftArrowIcon />}>Back to log in</Button>
          </Link>
        </form>
      </div>
    </div>
    </div>
  )
}

export default ForgotPassword