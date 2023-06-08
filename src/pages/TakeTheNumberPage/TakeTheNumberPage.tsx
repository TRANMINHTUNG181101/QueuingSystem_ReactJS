import { Layout, Input, Select, Table, Button, DatePicker } from "antd";
import "./TakeTheNumberPage.css";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "startTime",
    key: "startTime",
  },
  {
    title: "Hạn sử dụng",
    dataIndex: "expirationDate",
    key: "expirationDate",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Nguồn cấp",
    dataIndex: "source",
    key: "source",
  },
  {
    title: " ",
    dataIndex: "detail",
    key: "detail",
    render: () => <Link to="/dashboard/take-the-number-details">Chi tiết</Link>,
  },
];

const data = [
  {
    key: "1",
    stt: "1",
    customerName: "Khách hàng 1",
    serviceName: "Dịch vụ 1",
    startTime: "01/06/2023",
    expirationDate: "01/07/2023",
    status: "Hoạt động",
    source: "Nguồn 1",
  },
  {
    key: "2",
    stt: "2",
    customerName: "Khách hàng 2",
    serviceName: "Dịch vụ 2",
    startTime: "02/06/2023",
    expirationDate: "02/07/2023",
    status: "Hoạt động",
    source: "Nguồn 2",
  },
  {
    key: "2",
    stt: "2",
    customerName: "Khách hàng 2",
    serviceName: "Dịch vụ 2",
    startTime: "02/06/2023",
    expirationDate: "02/07/2023",
    status: "Hoạt động",
    source: "Nguồn 2",
  },
  {
    key: "2",
    stt: "2",
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

function TakeTheNumberPage() {
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
            <span>Tên dịch vụ</span>
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
            <span>Tình trạng</span>
            <Select style={{ width: "200px" }}>
              <Option value="connected">Đã kết nối</Option>
              <Option value="disconnected">Chưa kết nối</Option>
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
            <span>Nguồn cấp</span>
            <Select style={{ width: "200px" }}>
              <Option value="connected">Đã kết nối</Option>
              <Option value="disconnected">Chưa kết nối</Option>
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
            <span>Chọn thời gian</span>
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
          <Link to="/dashboard/add-take-the-number">
            Cấp <br />
            số mới
          </Link>
        </span>
      </Button>
    </Layout>
  );
}

export default TakeTheNumberPage;
