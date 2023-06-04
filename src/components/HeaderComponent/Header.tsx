import React from "react";
import { Layout, Breadcrumb, Avatar, Dropdown, Menu, Badge } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import ImageAvatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import "./Header.css";

const { Header, Content } = Layout;

const notificationData = [
  {
    id: 1,
    title: "Thông báo 1",
    description: "Đây là thông báo số 1",
  },
  {
    id: 2,
    title: "Thông báo 2",
    description: "Đây là thông báo số 2",
  },
  {
    id: 3,
    title: "Thông báo 3",
    description: "Đây là thông báo số 3",
  },
];

const menu = (
  <Menu>
    {notificationData.map((item) => (
      <Menu.Item key={item.id}>
        <strong>{item.title}</strong>
        <div>{item.description}</div>
      </Menu.Item>
    ))}
  </Menu>
);

const breadcrumbItems = [
  { title: "Home", link: "/" },
  { title: "Products", link: "/products" },
  { title: "Category", link: "/products/category" },
  { title: "Current Page", link: "" },
];

function HeaderComponent() {
  return (
    <Header className="header">
      <Breadcrumb className="breadcrumb" separator=">">
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.link ? <a href={item.link}>{item.title}</a> : item.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Badge count={notificationData.length}>
          <BellOutlined className="bell" />
        </Badge>
      </Dropdown>
      <Avatar src={ImageAvatar} className="avatar" />
      <div className="info">
        <span>Xin chào</span>
        <span className="username">
          <Link to="/dashboard/info" style={{ color: "#000000" }}>
            Trần Minh Tùng
          </Link>
        </span>
      </div>
    </Header>
  );
}

export default HeaderComponent;
