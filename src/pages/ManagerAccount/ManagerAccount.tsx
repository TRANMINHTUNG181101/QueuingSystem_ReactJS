import React from "react";
import { Layout, Input, Select, Table, Button } from "antd";
import "./ManagerAccount.css";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    sorter: false,
  },
  {
    title: "Họ tên",
    dataIndex: "fullName",
    key: "fullName",
    sorter: false,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    sorter: false,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: false,
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    sorter: false,
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "status",
    key: "status",
    sorter: false,
  },
  {
    title: " ",
    dataIndex: "update",
    key: "update",
    sorter: false,
    render: () => "Cập nhật",
  },
];

const data = [
  {
    key: "1",
    username: "user1",
    fullName: "Người dùng 1",
    phoneNumber: "123456789",
    email: "user1@example.com",
    role: "Vai trò 1",
    status: "Hoạt động",
  },
  {
    key: "2",
    username: "user2",
    fullName: "Người dùng 2",
    phoneNumber: "987654321",
    email: "user2@example.com",
    role: "Vai trò 2",
    status: "Ngừng hoạt động",
  },
  // Add more data items here
];

const pagination = {
  pageSize: 7,
};

function ManagerAccount() {
  return (
    <Layout>
      <Content style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            marginTop: "100px",
          }}
        >
          <div
            style={{
              marginRight: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <span>Tên vai trò:</span>
            <Select style={{ width: "200px" }}>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Ngừng hoạt động</Option>
            </Select>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <span>Từ khóa:</span>
            <Input
              style={{ width: "200px" }}
              prefix={
                <SearchOutlined
                  style={{ color: "#FF7506", marginLeft: "auto" }}
                />
              }
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          style={{ width: "100%" }}
          pagination={pagination}
        />
        <Button
          icon={
            <PlusOutlined
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#FF9138",
                color: "#FFF2E7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            />
          }
          style={{
            position: "absolute",
            right: "0px",
            top: "26%",
            width: "60px",
            height: "80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#FFF2E7 !important",
          }}
        >
          <span
            style={{ fontSize: "12px", fontWeight: "700", color: "#FF7506" }}
          >
            <Link to="/dashboard/add-account">
              Thêm
              <br /> tài khoản
            </Link>
          </span>
        </Button>
      </Content>
    </Layout>
  );
}

export default ManagerAccount;
