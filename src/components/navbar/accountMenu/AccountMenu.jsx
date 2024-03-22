import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Profile from "../../../assets/images/Profile.png";
import Logout from "../../../assets/images/Logout.png";

export function AccountMenu(props) {
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
        onMouseLeave={handleCloseMenu}
        sx={{ marginLeft:"-2%"}}
        className={props.isRailDashboard?"rail":"dashboard"}
      >
        <MenuItem className="avatar">
          <NavLink to="/profile" className="profile"><img src={Profile}/>My Profile</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/login" className="profile"><img src={Logout}/>Logout</NavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
