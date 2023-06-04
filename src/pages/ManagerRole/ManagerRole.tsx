import React from "react";
import { Layout, Input, Select, Table } from "antd";
import "./ManagerRole.css";

const { Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Tên vai trò",
    dataIndex: "roleName",
    key: "roleName",
    sorter: false,
  },
  {
    title: "Số người dùng",
    dataIndex: "userCount",
    key: "userCount",
    sorter: false,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
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
    roleName: "Vai trò 1",
    userCount: 10,
    description: "Mô tả vai trò 1",
  },
  {
    key: "2",
    roleName: "Vai trò 2",
    userCount: 5,
    description: "Mô tả vai trò 2",
  },
  // Add more data items here
];

const pagination = {
  pageSize: 7,
};

function ManagerRole() {
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

export default ManagerRole;
