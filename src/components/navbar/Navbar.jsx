import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import NJT_Logo from "../../assets/images/Logo1.png";
import HOME_Logo from "../../assets/images/house-solid.png";
import TIME_Logo from "../../assets/images/Group 6816.png";
import "./Navbar.scss";
import { AccountMenu } from "./accountMenu/AccountMenu";

const Navbar = (props) => {
  const { headNavbarData } = props;
  const location = useLocation();
  console.log("location", location)
  const isRailDashboard = location.pathname.includes('/dashboard/rail');

  const railDashboardNavLinks = headNavbarData?.railDashboardNavbar?.railNavLinks
  const railDashboardNavbartext = headNavbarData?.railDashboardNavbartext

  const handleClick = () => {
    navigate("/dashboard");
  };
  

  return (
    
    <div className="display">
      {isRailDashboard && 
      <div className="flex-center">
      <div className="logo-home" > 
        <Link to="/dashboard">
          <img  className="logo" src={HOME_Logo}/>
        </Link></div>
      <div className="text-align">{railDashboardNavbartext}</div>
      <div className="date-formate"><img src={TIME_Logo} className="logo" /><div className="time">20/03/2024</div></div>
      </div>
    }
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
    </div>
  );
};

export default Navbar;
