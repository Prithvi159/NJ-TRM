// Import necessary modules
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import "./login.scss";
import Logo from "../../assets/images/NJTransitLogo.png";
import LoginPageJson from "../../json/Login.json";
import { validateField } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user);


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
    LoginPageJson.fields.forEach((field) => {
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
  
      case "email":
      case "password":
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
  
      default:
        return null;
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        dispatch(signInStart());
        const res = await fetch('/njtransit/nodebackend/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.statusCode !== "200") {
          dispatch(signInFailure(data.message));
        } else {
          dispatch(signInSuccess(data));
          navigate('/dashboard');
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }

  };

  return (
    <div className="background-image">
      <div className="login-container">
        <div className="login-content">
          <div className="login-form-header">
            <img src={Logo} alt="Centered Image" />
          </div>
          <h2>Welcome to NJ Transit</h2>
          <h3>Use Ad login to sign-in</h3>
          <form onSubmit={handleLogin} noValidate>
            {LoginPageJson.fields.map(renderField)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
