import React from "react";
import { Layout, Breadcrumb, Avatar, Dropdown, Menu, Badge } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import ImageAvatar from "../../assets/avatar.png";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
const { Header } = Layout;
import breadcrumbVi from "../../breadcrumbVi.json";

interface BreadcrumbTranslations {
  [key: string]: string;
}

function HeaderComponent() {
  const auth = useSelector((state: RootState) => state.auth.user);
  const numberData = useSelector((state: RootState) => state.number.numbers);
  const location = useLocation();
  const breadcrumbItems = location.pathname
    .split("/")
    .filter((item) => item !== "")
    .map((item, index, arr) => ({
      title: (breadcrumbVi as BreadcrumbTranslations)[item] || item,
      link: `/${arr.slice(0, index + 1).join("/")}`,
    }));

  const notificationData = numberData
    ? numberData.slice(-6).map((number) => ({
        id: number.idNumber,
        title: `Người dùng: ${number.customerName}`,
        description: `Thời gian nhận số: ${number.issuanceDate}`,
      }))
    : [];

  const menu = (
    <Menu>
      {notificationData.map((item) => (
        <Menu.Item key={item.id}>
          <strong style={{ color: "#FF7506", fontWeight: "600" }}>
            {item.title}
          </strong>
          <div>{item.description}</div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header className="header">
      <Breadcrumb className="breadcrumb" separator=">">
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.link ? <Link to={item.link}>{item.title}</Link> : item.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
        <Badge count={notificationData.length}>
          <BellOutlined className="bell" style={{ cursor: "pointer" }} />
        </Badge>
      </Dropdown>
      <Avatar src={ImageAvatar} className="avatar" />
      <div className="info">
        <span>Xin chào</span>
        <span className="username">
          <Link to="/dashboard/info" style={{ color: "#000000" }}>
            {auth?.fullName}
          </Link>
        </span>
      </div>
    </Header>
  );
}

export default HeaderComponent;
