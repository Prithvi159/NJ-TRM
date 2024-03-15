import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import NJT_Logo from "../../assets/images/Logo1.png";
import "./Navbar.scss";
import { AccountMenu } from "./accountMenu/AccountMenu";

const Navbar = (props) => {
  const { headNavbarData } = props;
  const location = useLocation();
  console.log("location", location)
  const isRailDashboard = location.pathname.includes('/dashboard/rail');

  const railDashboardNavLinks = headNavbarData?.railDashboardNavbar?.railNavLinks

  return (
    <div className="navbar">
      <div className="logo-container">
        <Link to="/dashboard">
          <img src={NJT_Logo} className="logo" />
        </Link>
      </div>
      {isRailDashboard && 
        <div className="nav-links-container">
            {railDashboardNavLinks?.length && railDashboardNavLinks.map((link, index) => (
            <NavLink key={index} to={link.to} activeclassname="active">
              {link.text}
            </NavLink>
            ))}
        </div>
      }
      <div className="avatar-container">
        <AccountMenu accountMenuJson={headNavbarData?.accountMenu} />
      </div>
    </div>
  );
};

export default Navbar;
