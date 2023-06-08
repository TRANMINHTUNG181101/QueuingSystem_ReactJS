import React from "react";
import { Layout, DatePicker, Select, Table, Button } from "antd";
import "./ReportPage.css";
import { DownloadOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

interface DataItem {
  key: string;
  stt: number;
  customerName: string;
  serviceName: string;
  startTime: string;
  expirationDate: string;
  status: string;
  source: string;
}

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    sorter: (a: DataItem, b: DataItem) => a.stt - b.stt,
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "serviceName",
    key: "serviceName",
    sorter: (a: DataItem, b: DataItem) =>
      a.serviceName.localeCompare(b.serviceName),
  },
  {
    title: "Thời gian cấp",
    dataIndex: "startTime",
    key: "startTime",
    sorter: (a: DataItem, b: DataItem) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    sorter: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status),
  },
  {
    title: "Nguồn cấp",
    dataIndex: "source",
    key: "source",
    sorter: (a: DataItem, b: DataItem) => a.source.localeCompare(b.source),
  },
];

const data: DataItem[] = [
  {
    key: "1",
    stt: 1,
    customerName: "Khách hàng 1",
    serviceName: "Dịch vụ 1",
    startTime: "01/06/2023",
    expirationDate: "01/07/2023",
    status: "Hoạt động",
    source: "Nguồn 1",
  },
  {
    key: "2",
    stt: 2,
    customerName: "Khách hàng 2",
    serviceName: "Dịch vụ 2",
    startTime: "02/06/2023",
    expirationDate: "02/07/2023",
    status: "Hoạt động",
    source: "Nguồn 2",
  },
  {
    key: "3",
    stt: 3,
    customerName: "Khách hàng 2",
    serviceName: "Dịch vụ 2",
    startTime: "02/06/2023",
    expirationDate: "02/07/2023",
    status: "Hoạt động",
    source: "Nguồn 2",
  },
  {
    key: "4",
    stt: 4,
    customerName: "Khách hàng 2",
    serviceName: "Dịch vụ 2",
    startTime: "02/06/2023",
    expirationDate: "02/07/2023",
    status: "Hoạt động",
    source: "Nguồn 2",
  },
];

const pagination = {
  pageSize: 7,
};

function ReportPage() {
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
            <DatePicker />
          </div>
          <div
            style={{
              marginRight: "16px",
              marginTop: "25px",
            }}
          >
            <DatePicker />
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
          <DownloadOutlined
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
          Tải về
        </span>
      </Button>
    </Layout>
  );
}

export default ReportPage;
