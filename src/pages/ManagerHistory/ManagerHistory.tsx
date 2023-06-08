import React from "react";
import { Layout, Input, Select, Table, DatePicker } from "antd";
import "./ManagerHistory.css";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

interface DataItem {
  key: string;
  username: string;
  actionTime: string;
  ipAddress: string;
  action: string;
}

const columns = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    sorter: false,
  },
  {
    title: "Thời gian tác động",
    dataIndex: "actionTime",
    key: "actionTime",
    sorter: false,
  },
  {
    title: "IP thực hiện",
    dataIndex: "ipAddress",
    key: "ipAddress",
    sorter: false,
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "action",
    key: "action",
    sorter: false,
  },
];

const data: DataItem[] = [
  {
    key: "1",
    username: "user1",
    actionTime: "01/06/2023 10:00 AM",
    ipAddress: "192.168.0.1",
    action: "Thao tác 1",
  },
  {
    key: "2",
    username: "user2",
    actionTime: "02/06/2023 11:30 AM",
    ipAddress: "192.168.0.2",
    action: "Thao tác 2",
  },
  {
    key: "3",
    username: "user3",
    actionTime: "03/06/2023 02:45 PM",
    ipAddress: "192.168.0.3",
    action: "Thao tác 3",
  },
  {
    key: "4",
    username: "user4",
    actionTime: "04/06/2023 09:15 AM",
    ipAddress: "192.168.0.4",
    action: "Thao tác 4",
  },
];

const pagination = {
  pageSize: 7,
};

function ManagerHistory() {
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
      </Content>
    </Layout>
  );
}

export default ManagerHistory;
