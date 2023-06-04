import "./Sidebar.css";
import ImageLogo from "../../assets/Group.png";
import { Layout, Menu, Row, Col, Card, Statistic } from "antd";
import {
  DashboardOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  NumberOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
import { LineChartOutlined, PieChartOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar() {
  const location = useLocation();

  const getMenuKey = () => {
    const path = location.pathname;
    if (path === "/dashboard") {
      return "dashboard";
    } else if (path === "/dashboard/device") {
      return "device";
    } else if (path === "/dashboard/service") {
      return "services";
    } else if (path === "/dashboard/take-the-number") {
      return "take-the-number";
    } else if (path === "/dashboard/report") {
      return "report";
    } else if (path === "/dashboard/manager-role") {
      return "manager-role";
    } else if (path === "/dashboard/manager-account") {
      return "manager-account";
    } else if (path === "/dashboard/manager-history") {
      return "manager-history";
    }
    return "";
  };
  return (
    <Sider width={200} className="sidebar">
      <div className="logo">
        <img src={ImageLogo} alt="Logo" />
      </div>
      <Menu mode="inline" defaultSelectedKeys={[getMenuKey()]} className="menu">
        <Menu.Item
          key="dashboard"
          icon={<DashboardOutlined />}
          className="menu-item"
        >
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item
          key="device"
          icon={<DesktopOutlined />}
          className="menu-item"
        >
          <Link to="/dashboard/device">Thiết bị</Link>
        </Menu.Item>
        <Menu.Item
          key="services"
          icon={<AppstoreOutlined />}
          className="menu-item"
        >
          <Link to="/dashboard/service">Dịch vụ</Link>
        </Menu.Item>
        <Menu.Item
          key="take-the-number"
          icon={<NumberOutlined />}
          className="menu-item"
        >
          <Link to="/dashboard/take-the-number">Cấp số</Link>
        </Menu.Item>
        <Menu.Item
          key="report"
          icon={<BarChartOutlined />}
          className="/dashboard/menu-item"
        >
          <Link to="report">Báo cáo</Link>
        </Menu.Item>
        <Menu>
          <SubMenu
            key="settings"
            title="Cài đặt hệ thống"
            icon={<SettingOutlined />}
            className="menu-item"
          >
            <Menu.Item key="manager-role">
              <Link to="/dashboard/manager-role">Quản lí vai trò</Link>
            </Menu.Item>
            <Menu.Item key="manager-account">
              <Link to="/dashboard/manager-account">Quản lí tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="manager-history">
              <Link to="/dashboard/manager-history">Nhật kí người dùng</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Menu>
      <div className="logout">
        <LogoutOutlined className="logout-icon" />
        <span>Đăng xuất</span>
      </div>
    </Sider>
  );
}

export default Sidebar;
