import React from "react";
import { Layout, Input, Select, Table } from "antd";
import "./ManagerAccount.css";

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
            <span>Trạng thái hoạt động:</span>
            <Select style={{ width: "200px" }}>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Ngừng hoạt động</Option>
            </Select>
          </div>
          <div
            style={{
              marginRight: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <span>Trạng thái kết nối:</span>
            <Select style={{ width: "200px" }}>
              <Option value="connected">Đã kết nối</Option>
              <Option value="disconnected">Chưa kết nối</Option>
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
            <Input style={{ width: "200px" }} />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          style={{ width: "100%" }}
          pagination={pagination}
        />
      </Content>
    </Layout>
  );
}

export default ManagerAccount;
