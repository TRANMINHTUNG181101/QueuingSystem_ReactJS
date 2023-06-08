import { Col, Input, Layout, Row, Select, DatePicker, Table } from "antd";
import "./ServiceDetails.css";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

function ServiceDetails() {
  const dataSource = [
    { id: 1, status: "Đã xong" },
    { id: 2, status: "Đang xử lý" },
    { id: 3, status: "Chưa bắt đầu" },
    { id: 4, status: "Đã xong" },
    { id: 5, status: "Chưa bắt đầu" },
    { id: 6, status: "Đang xử lý" },
  ];

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];
  const pagination = {
    pageSize: 5,
  };
  return (
    <div className="service-details">
      <div className="service-details__content">
        <Layout>
          <Row style={{ gap: "20px" }}>
            <Col
              span={8}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                alignItems: "flex-start",
                gap: "10px",
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <h3>Thông tin dịch vụ</h3>
              <div className="device__info">
                <h3>Mã dịch vụ:</h3>
                <span>201</span>
              </div>
              <div className="device__info">
                <h3>Tên dịch vụ:</h3>
                <span>Khám tim mạch</span>
              </div>
              <div className="device__info">
                <h3>Mô tả:</h3>
                <span>Chuyên các bệnh lý về tim</span>
              </div>
              <h3 style={{ marginTop: "20px" }}>Quy tắc cấp số</h3>
              <div className="device__info">
                <h3>Tăng tự động</h3>
                <Input style={{ width: "50px" }} />
                <span>đến</span>
                <Input style={{ width: "50px" }} />
              </div>
              <div className="device__info">
                <h3>Prefix:</h3>
                <Input style={{ width: "50px" }} />
              </div>
              <div className="device__info">
                <h3>Reset mỗi ngày</h3>
              </div>
            </Col>
            <Col
              span={15}
              style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "20px",
                marginLeft: "10px !important",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
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
                  <span>Tình trạng</span>
                  <Select style={{ width: "100px" }}>
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
                  <Select style={{ width: "100px" }}>
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
                    borderRadius: "20px",
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
                    style={{ width: "150px" }}
                    prefix={
                      <SearchOutlined
                        style={{ color: "#FF7506", marginLeft: "auto" }}
                      />
                    }
                  />
                </div>
              </div>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
              />
            </Col>
          </Row>
        </Layout>
      </div>
    </div>
  );
}

export default ServiceDetails;
