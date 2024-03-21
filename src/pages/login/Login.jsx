import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Login.scss";
import Logo from "../../assets/images/NJTransitLogo.png";
import LoginPageJson from "../../json/enLogin.json";
import { validateField } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [enable, setEnable] = useState(true);

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const backimage = LoginPageJson.content.login.content.headline.iconDetails

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if(event.target.tagName!=="INPUT"){
  //       setFormErrors("")
  //     }
  //   }
  //   document.addEventListener("click",handleClickOutside );
  //   return() =>{
  //     document.addEventListener("click",handleClickOutside)
  //   }
  // })

  const handleInputChange = (field, value) => {
    const validationError = validateField(field.validations, value);
    setFormData((prevData) => ({
      ...prevData,
      [field.name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: validationError,
    }));
    setEnable(value.trim()==='');
  };

  const validateForm = () => {
    const errors = {};
    LoginPageJson.content.login.content.userLoginDetails.forEach((field) => {
      const validationError = validateField(
        field?.validations,
        formData[field.name]
      );
      if (validationError) {
        errors[field.name] = validationError;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderField = (field) => {
    switch (field.dataType) {
      case "checkbox":
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                value={field.name}
                color="primary"
                checked={formData[field.name] || false}
                onChange={() => handleInputChange(field, !formData[field.name])}
              />
            }
            label={field.label}
          />
        );

      case "email":
      case "email":
        return (
          <TextField
            key={field.name}
            required={field.isRequired}
            error={Boolean(formErrors[field.name])}
            helperText={formErrors[field.name]}
            id={`outlined-${field.name}`}
            label={field.fieldLabel}
            type={field.fieldType}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
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
      // try {
      //   dispatch(signInStart());
      //   const res = await fetch("/njtransit/nodebackend/auth/signin", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   });
      //   const data = await res.json();
      //   if (data.statusCode !== "200") {
      //     dispatch(signInFailure(data.message));
      //   } else {
      //     dispatch(signInSuccess(data));
      //     // navigate("/dashboard");
      //   }
      // } catch (error) {
      //   dispatch(signInFailure(error.message));
      // }
      navigate("/dashboard");
    }
  };

  const renderButton = (button, index) => (
    <Button
      key={index}
      type={button.type}
      fullWidth
      variant={button.variant}
      color={button.color}
      sx={{ mt: 3, mb: 2, opacity: enable ? 0.5 :1,}}
      disabled={enable}
    >
      {button.text}
    </Button>
  );

  return (
    <div className="background-image">
      <div className="login-container">
        <div className="login-content">
          <div className="login-form-header">
            <img src={backimage.url} alt={backimage.altText} />
          </div>
          <div className="text-flex"><div  className="text-flex1">{LoginPageJson.content.login.content.headline.welcom}</div><div className="text-flex">{LoginPageJson.content.login.content.headline.text}</div></div>
          <div className="sign-in-text">{LoginPageJson.content.login.content.headline.text1}</div>
          <form onSubmit={handleLogin} noValidate>
            {LoginPageJson.content.login.content.userLoginDetails.map(renderField)}
            <p className="additional-text">{LoginPageJson.content.login.content.headline.additionalText}</p>
            {LoginPageJson.content.login.content.primaryButton.map(renderButton)}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
