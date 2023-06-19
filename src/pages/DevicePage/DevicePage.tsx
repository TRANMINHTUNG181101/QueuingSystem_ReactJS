import { Layout, Row, Col, Card, Button } from "antd";
import "./DevicePage.css";
const { Content } = Layout;
import { Table, Tag } from "antd";
import { Select, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeviceThunk } from "../../store/device/deviceThunks";
import { useEffect, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import FilterDevice from "../../components/FilterDevice/FilterDevice";

const { Option } = Select;

interface DataItem {
  deviceId: string;
  deviceName: number;
  ipAddress: string;
  activityStatus: string;
  connectionStatus: string;
  services: string;
}

const columns = [
  {
    title: "Mã thiết bị",
    dataIndex: "deviceId",
    key: "deviceId",
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
    dataIndex: "stateActive",
    key: "stateActive",
  },
  {
    title: "Trạng thái kết nối",
    dataIndex: "stateConnect",
    key: "stateConnect",
  },
  {
    title: "Dịch vụ sử dụng",
    dataIndex: "services",
    key: "services",
    render: (services: string[]) => <span>{services.join(", ")}</span>,
  },
  {
    title: " ",
    dataIndex: "detail",
    key: "detail",
    render: (text: any, record: any) => (
      <Link to="/dashboard/device/device-details" state={{ device: record }}>
        Chi tiết
      </Link>
    ),
  },
  {
    title: " ",
    dataIndex: "update",
    key: "update",
    render: (text: any, record: any) => (
      <Link to="/dashboard/device/edit-device" state={{ device: record }}>
        Cập nhật
      </Link>
    ),
  },
];

const pagination = {
  pageSize: 7,
};

function DevicePage() {
  const [activeStatus, setActiveStatus] = useState<string | undefined>(
    undefined
  );
  const [connectStatus, setConnectStatus] = useState<string | undefined>(
    undefined
  );
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const deviceData = useSelector((state: RootState) => state.device.devices);

  useEffect(() => {
    dispatch(fetchDeviceThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);

  const filteredData = deviceData.filter((item: any) => {
    const isStatusActiveMatched =
      !activeStatus || item.stateActive === activeStatus;
    const isStatusConnectMatched =
      !connectStatus || item.stateConnect === connectStatus;
    const isKeywordMatched =
      !keyword ||
      item.deviceId.includes(keyword) ||
      item.deviceName.toString().includes(keyword) ||
      item.ipAddress.includes(keyword) ||
      item.services.includes(keyword);

    return isStatusActiveMatched && isStatusConnectMatched && isKeywordMatched;
  });
  const handleActiveStatusChange = (value: string) => {
    setActiveStatus(value);
  };

  const handleConnectStatusChange = (value: string) => {
    setConnectStatus(value);
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <Layout>
      <Content style={{ padding: "16px" }}>
        <FilterDevice
          activeStatus={activeStatus}
          connectStatus={connectStatus}
          keyword={keyword}
          handleActiveStatusChange={handleActiveStatusChange}
          handleConnectStatusChange={handleConnectStatusChange}
          handleKeywordChange={handleKeywordChange}
        />
        <Table
          columns={columns}
          dataSource={filteredData}
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
          <Link to="add-device" style={{ color: "#FF7506" }}>
            Thêm
            <br /> thiết bị
          </Link>
        </span>
      </Button>
    </Layout>
  );
}

export default DevicePage;
