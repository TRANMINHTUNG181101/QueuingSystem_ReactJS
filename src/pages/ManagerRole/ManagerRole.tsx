import React from "react";
import { Layout, Input, Select, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ManagerRole.css";
import { SearchOutlined } from "@ant-design/icons";

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
            <Link to="/dashboard/add-role">
              Thêm
              <br /> vai trò
            </Link>
          </span>
        </Button>
      </Content>
    </Layout>
  );
}

export default ManagerRole;
