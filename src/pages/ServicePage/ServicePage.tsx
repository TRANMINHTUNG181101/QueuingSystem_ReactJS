import React from "react";
import { Layout, Input, Select, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ServicePage.css";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Mã dịch vụ",
    dataIndex: "serviceCode",
    key: "serviceCode",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "activityStatus",
    key: "activityStatus",
  },
  {
    title: " ",
    dataIndex: "detail",
    key: "detail",
    render: () => <a href="#">Chi tiết</a>,
  },
  {
    title: " ",
    dataIndex: "update",
    key: "update",
    render: () => <a href="#">Cập nhật</a>,
  },
];

const data = [
  {
    key: "1",
    serviceCode: "SERVICE001",
    serviceName: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    activityStatus: "Hoạt động",
  },
  {
    key: "1",
    serviceCode: "SERVICE001",
    serviceName: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    activityStatus: "Hoạt động",
  },
  {
    key: "1",
    serviceCode: "SERVICE001",
    serviceName: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    activityStatus: "Hoạt động",
  },
  {
    key: "1",
    serviceCode: "SERVICE001",
    serviceName: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    activityStatus: "Hoạt động",
  },
  {
    key: "1",
    serviceCode: "SERVICE001",
    serviceName: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    activityStatus: "Hoạt động",
  },
  {
    key: "1",
    serviceCode: "SERVICE001",
    serviceName: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    activityStatus: "Hoạt động",
  },
  {
    key: "1",
    serviceCode: "SERVICE001",
    serviceName: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    activityStatus: "Hoạt động",
  },
  {
    key: "1",
    serviceCode: "SERVICE001",
    serviceName: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    activityStatus: "Hoạt động",
  },
];

const pagination = {
  pageSize: 7,
};

function ServicePage() {
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
        <span style={{ fontSize: "12px", fontWeight: "700", color: "#FF7506" }}>
          <Link to="/dashboard/add-service">
            Thêm <br />
            dịch vụ
          </Link>
        </span>
      </Button>
    </Layout>
  );
}

export default ServicePage;
