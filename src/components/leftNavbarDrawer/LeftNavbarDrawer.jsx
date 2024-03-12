import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./LeftNavbarDrawer.scss";
import DashboardJson from "../../json/Dashboard.json";

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
            <div className="icon">{/* Add icon*/}</div>
            <span className="title">{item.label}</span>
            {location.pathname.includes(
              item.label.toLowerCase().replace(/\s+/g, "-")
            ) && <div className="arrow" />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbarDrawer;
