import "./Dashboard.css";
import { Layout } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import { Route, Routes, useLocation } from "react-router-dom";
import DevicePage from "../DevicePage/DevicePage";
import ServicePage from "../ServicePage/ServicePage";
import TakeTheNumberPage from "../TakeTheNumberPage/TakeTheNumberPage";
import ReportPage from "../ReportPage/ReportPage";
import ManagerRole from "../ManagerRole/ManagerRole";
import ManagerAccount from "../ManagerAccount/ManagerAccount";
import ManagerHistory from "../ManagerHistory/ManagerHistory";
import HeaderComponent from "../../components/HeaderComponent/Header";
import InfoPage from "../InfoPage/InfoPage";
import AddDevicePage from "../AddDevicePage/AddDevicePage";
import AddSevicePage from "../AddSevicePage/AddSevicePage";
import AddTakeTheNumber from "../AddTakeTheNumber/AddTakeTheNumber";
function Dashboard() {
  const location = useLocation();
  const isPaddedRoute =
    location.pathname === "/dashboard/manager-role" ||
    location.pathname === "/dashboard/take-the-number" ||
    location.pathname === "/dashboard/manager-account" ||
    location.pathname === "/dashboard/manager-history" ||
    location.pathname === "/dashboard/device" ||
    location.pathname === "/dashboard/report" ||
    location.pathname === "/dashboard/service";

  return (
    <Layout className={isPaddedRoute ? "padded-layout" : ""}>
      <Sidebar />
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/device" element={<DevicePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/take-the-number" element={<TakeTheNumberPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/manager-role" element={<ManagerRole />} />
        <Route path="/manager-account" element={<ManagerAccount />} />
        <Route path="/manager-history" element={<ManagerHistory />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/add-device" element={<AddDevicePage />} />
        <Route path="/add-service" element={<AddSevicePage />} />
        <Route path="/add-take-the-number" element={<AddTakeTheNumber />} />
      </Routes>
    </Layout>
  );
}

export default Dashboard;
