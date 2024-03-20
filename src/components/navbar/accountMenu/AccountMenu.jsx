import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        alt="User Avatar"
        src="/path/to/avatar.jpg"
       onMouseEnter={handleOpenMenu}
       onMouseLeave={handleCloseMenu}
       sx={{cursor: "pointer"}}

      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={ handleCloseMenu}
        sx={{marginTop: "5%", marginLeft:"-2%"}}
      >
        <MenuItem className="avatar">
          <NavLink to="/profile" className="profile">My Profile</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/login" className="profile">Logout</NavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
