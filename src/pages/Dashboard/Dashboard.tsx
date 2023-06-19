import "./Dashboard.css";
import { Layout } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import AddRole from "../AddRole/AddRole";
import AddAccount from "../AddAccount/AddAccount";
import DeviceDetails from "../DeviceDetails/DeviceDetails";
import EditDevice from "../EditDevice/EditDevice";
import ServiceDetails from "../ServiceDetails/ServiceDetails";
import TakeTheNumberDetails from "../TakeTheNumberDetails/TakeTheNumberDetails";
import EditService from "../EditService/EditService";
import EditRole from "../EditRole/EditRole";
import EditAccount from "../EditAccount/EditAccount";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const authData = useSelector((state: RootState) => state.auth.user);
  const isPaddedRoute =
    location.pathname === "/dashboard/manager-role" ||
    location.pathname === "/dashboard/take-the-number" ||
    location.pathname === "/dashboard/manager-account" ||
    location.pathname === "/dashboard/manager-history" ||
    location.pathname === "/dashboard/device" ||
    location.pathname === "/dashboard/report" ||
    location.pathname === "/dashboard/service";

  useEffect(() => {
    if (!authData) {
      navigate("/");
      console.log("Không có auth, chuyển về trang chủ");
    }
  }, [authData, navigate]);
  return (
    <Layout className={isPaddedRoute ? "padded-layout" : ""}>
      <Sidebar />
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/device" element={<DevicePage />} />
        <Route path="/device/device-details" element={<DeviceDetails />} />
        <Route path="/device/edit-device" element={<EditDevice />} />
        <Route path="/device/add-device" element={<AddDevicePage />} />

        <Route path="/service" element={<ServicePage />} />
        <Route path="/service/add-service" element={<AddSevicePage />} />
        <Route path="/service/service-details" element={<ServiceDetails />} />
        <Route path="/service/edit-service" element={<EditService />} />

        <Route path="/take-the-number" element={<TakeTheNumberPage />} />
        <Route
          path="/take-the-number/add-take-the-number"
          element={<AddTakeTheNumber />}
        />
        <Route
          path="/take-the-number/take-the-number-details"
          element={<TakeTheNumberDetails />}
        />

        <Route path="/manager-role" element={<ManagerRole />} />
        <Route path="/manager-role/add-role" element={<AddRole />} />
        <Route path="/manager-role/edit-role" element={<EditRole />} />

        <Route path="/manager-account" element={<ManagerAccount />} />
        <Route path="/manager-account/add-account" element={<AddAccount />} />
        <Route path="/manager-account/edit-account" element={<EditAccount />} />

        <Route path="/report" element={<ReportPage />} />
        <Route path="/manager-history" element={<ManagerHistory />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </Layout>
  );
}

export default Dashboard;
