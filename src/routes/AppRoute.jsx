import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Auth from "../components/Auth";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import { DashboardLayout } from "../components/dashboard/dashboardLayout/DashboardLayout";
import { PolledData } from "../components/dashboard/railDashboard/polledData/PolledData";
import { RailDashboard } from "../components/dashboard/railDashboard/RailDashboard";
import { Dashboard } from "../components/dashboard/Dashboard";
import { DataBrowse } from "../components/dashboard/railDashboard/polledData/dataBrowse/DataBrowse";
import { Loader } from "../components/loader/Loader";
import { Suspense } from "react";
import TransmissionTracking from "../components/dashboard/railDashboard/polledData/transmissionTracking/TransmissionTracking";

// const RailDashboard = lazy(() => import('./pages/Home'));
// const About = lazy(() => import('./pages/About'));

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    // <Suspense fallback={<Loader />}>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route element={<Auth />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="rail" element={<RailDashboard />}>
              <Route path="polled-data" element={<PolledData />}>
                <Route index path="data-browse" element={<DataBrowse />} />
                <Route path="transmission-tracking" element={<TransmissionTracking />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    // </Suspense>
  )
);
