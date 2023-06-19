import { Col, Button, Layout, Row } from "antd";
import "./DeviceDetails.css";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DeviceInterface } from "../../interfaces/deviceInterface";

function DeviceDetails() {
  const location = useLocation();
  const { device }: { device: DeviceInterface } = location.state;

  return (
    <div className="device-details">
      <div className="device-details__content">
        <Layout>
          <h3>Thông tin thiết bị</h3>
          <Row gutter={20}>
            <Col
              span={12}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="device__info">
                <h3>Mã thiết bị:</h3>
                <span>{device.deviceId}</span>
              </div>
              <div className="device__info">
                <h3>Tên thiết bị:</h3>
                <span>{device.deviceName}</span>
              </div>
              <div className="device__info">
                <h3>Địa chỉ IP:</h3>
                <span>{device.ipAddress}</span>
              </div>
            </Col>
            <Col
              span={12}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="device__info">
                <h3>Loại thiết bị:</h3>
                <span>{device.deviceType}</span>
              </div>
              <div className="device__info">
                <h3>Tên đăng nhập:</h3>
                <span>{device.username}</span>
              </div>
              <div className="device__info">
                <h3>Mật khẩu:</h3>
                <span>{device.password}</span>
              </div>
            </Col>
            <Col span={24} style={{ marginTop: "30px" }}>
              <div
                className="device__info"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  alignItems: "flex-start",
                }}
              >
                <h3>Dịch vụ sử dụng:</h3>
                <span>{device.services}</span>
              </div>
            </Col>
          </Row>
        </Layout>
      </div>
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
          <Link to="/dashboard/edit-device">
            Cập nhật
            <br /> thiết bị
          </Link>
        </span>
      </Button>
    </div>
  );
}

export default DeviceDetails;
