import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Auth from "../components/Auth";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import { DashboardLayout } from "../components/dashboard/dashboardLayout/DashboardLayout";
import { PolledData } from "../components/dashboard/railDashboard/polledData/PolledData";
import { Dashboard } from "../components/dashboard/Dashboard";
import { DataBrowse } from "../components/dashboard/railDashboard/polledData/dataBrowse/DataBrowse";
import TransmissionTracking from "../components/dashboard/railDashboard/polledData/transmissionTracking/TransmissionTracking";
import { lazy } from "react";
import ErrorProcessing from "../components/dashboard/railDashboard/polledData/errorProcessing/ErrorProcessing";
import SummaryFileBrowse from "../components/dashboard/railDashboard/polledData/summaryFileBrowse/SummaryFileBrowse";
import {TransactionDetails} from "../components/dashboard/railDashboard/polledData/dataBrowse/TransactionDetails";
import {ExceptionDetails} from "../components/dashboard/railDashboard/polledData/dataBrowse/ExceptionDetails";

const RailDashboard = lazy(() =>
  import("../components/dashboard/railDashboard/RailDashboard")
);

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route element={<Auth />}> 
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="rail" element={<RailDashboard />}>
            <Route path="polled-data" element={<PolledData />}>
              <Route path="data-browse" element={<DataBrowse />} >
                
              </Route>
              <Route path="transmission-tracking" element={<TransmissionTracking />} />
              <Route path="error-processing" element={<ErrorProcessing />} />
              <Route path="summary-file-browse" element={<SummaryFileBrowse />} />
              <Route path="data-browse/transaction-details" element={<TransactionDetails />} />
              <Route path="data-browse/exception-details" element={<ExceptionDetails />} />
              
            </Route>
          </Route>
        </Route>
     </Route> 
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
