import { Layout, Row, Col, Card, Button } from "antd";
import "./DevicePage.css";
const { Content } = Layout;
import { Table, Tag } from "antd";
import { Select, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Option } = Select;

const columns = [
  {
    title: "Mã thiết bị",
    dataIndex: "deviceCode",
    key: "deviceCode",
  },
  {
    title: "Tên thiết bị",
    dataIndex: "deviceName",
    key: "deviceName",
  },
  {
    title: "Địa chỉ IP",
    dataIndex: "ipAddress",
    key: "ipAddress",
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "activityStatus",
    key: "activityStatus",
  },
  {
    title: "Trạng thái kết nối",
    dataIndex: "connectionStatus",
    key: "connectionStatus",
  },
  {
    title: "Dịch vụ sử dụng",
    dataIndex: "serviceUsed",
    key: "serviceUsed",
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
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },

  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
  {
    key: "1",
    deviceCode: "DEV001",
    deviceName: "Thiết bị 1",
    ipAddress: "192.168.0.1",
    activityStatus: "Hoạt động",
    connectionStatus: "Đã kết nối",
    serviceUsed: "Dịch vụ A",
  },
];

const pagination = {
  pageSize: 7,
};

function DevicePage() {
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
          <Link to="/dashboard/add-device">
            Thêm
            <br /> thiết bị
          </Link>
        </span>
      </Button>
    </Layout>
  );
}

export default DevicePage;
