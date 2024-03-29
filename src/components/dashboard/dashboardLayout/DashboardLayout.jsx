import React, { Suspense } from "react";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import "./DashboardLayout.scss";
import DashboardJson from "../../../json/Dashboard.json";
import { Outlet } from "react-router-dom";
import Loader from "../../custom/loader/Loader";

export function DashboardLayout() {
  const headNavbarJsonData = DashboardJson?.headNavbar;

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Navbar headNavbarData={headNavbarJsonData} />
        <div className="dashboard-content">
          <Outlet />
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
