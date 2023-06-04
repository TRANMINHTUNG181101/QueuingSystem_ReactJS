import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import DevicePage from "./pages/DevicePage/DevicePage";
import ServicePage from "./pages/ServicePage/ServicePage";
import TakeTheNumberPage from "./pages/TakeTheNumberPage/TakeTheNumberPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import ManagerRole from "./pages/ManagerRole/ManagerRole";
import ManagerAccount from "./pages/ManagerAccount/ManagerAccount";
import ManagerHistory from "./pages/ManagerHistory/ManagerHistory";
import InfoPage from "./pages/InfoPage/InfoPage";
import AddDevicePage from "./pages/AddDevicePage/AddDevicePage";
import AddSevicePage from "./pages/AddSevicePage/AddSevicePage";
import AddTakeTheNumber from "./pages/AddTakeTheNumber/AddTakeTheNumber";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="device" element={<DevicePage />} />
          <Route path="service" element={<ServicePage />} />
          <Route path="take-the-number" element={<TakeTheNumberPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="manager-role" element={<ManagerRole />} />
          <Route path="manager-account" element={<ManagerAccount />} />
          <Route path="manager-history" element={<ManagerHistory />} />
          <Route path="info" element={<InfoPage />} />
          <Route path="add-device" element={<AddDevicePage />} />
          <Route path="add-service" element={<AddSevicePage />} />
          <Route path="add-take-the-number" element={<AddTakeTheNumber />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
