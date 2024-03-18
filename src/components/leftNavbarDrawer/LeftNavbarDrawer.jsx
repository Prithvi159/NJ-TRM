import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./LeftNavbarDrawer.scss";
import DashboardJson from "../../json/Dashboard.json";
import Arrow from "../../assets/images/Path 4786.png";

const LeftNavbarDrawer = () => {
  const location = useLocation();
  const leftNavbarJson = DashboardJson?.leftNavbar;

  return (
    <div className="left-navbar">
      <div className="left-nav-links">
        {leftNavbarJson?.railLeftNavbar?.railLeftNavLinks.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`menu-item ${
              location.pathname.includes(
                item.label.toLowerCase().replace(/\s+/g, "-")
              )
                ? "active"
                : ""
            }`}
          >
            <div className="icon"><img src ={item.imagePath}/><span className="title">{item.label}</span></div>
            {location.pathname.includes(
              item.label.toLowerCase().replace(/\s+/g, "-")
            ) &&  <div className="arrow"><img src ={Arrow}/></div>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbarDrawer;
