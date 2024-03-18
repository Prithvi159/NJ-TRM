import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        alt="User Avatar"
        src="/path/to/avatar.jpg"
        onClick={handleClick}
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/profile">My Profile</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/login">Logout</NavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
