import React from "react";
import { Outlet } from "react-router-dom";
import LeftNavbarDrawer from "../../leftNavbarDrawer/LeftNavbarDrawer";
import "./RailDashboard.scss"
import Breadcrumb from "../../custom/breadcrumb/Breadcrumb";
import { EXCLUDE_LINKS } from "../../../utils/constants/commonConstants";

export default function RailDashboard() {
  return (
    <div className="railDashboard">
      <LeftNavbarDrawer />
      <Breadcrumb excludeLinks={EXCLUDE_LINKS}/>
      <Outlet />
    </div>
  );
}
