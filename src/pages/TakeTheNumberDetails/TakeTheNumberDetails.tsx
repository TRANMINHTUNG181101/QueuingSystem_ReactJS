import { Col, Layout, Row, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./TakeTheNumberDetails.css";
import { NumberingInterface } from "../../interfaces/numberInterface";

function TakeTheNumberDetails() {
  const location = useLocation();
  const { number }: { number: NumberingInterface } = location.state;
  return (
    <div className="take-the-number-details">
      <div className="take-the-number-details__content">
        <Layout>
          <h3>Thông tin cấp số</h3>
          <Row gutter={20}>
            <Col
              span={12}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="take-the-number__info">
                <h3>Họ tên:</h3>
                <span>{number.customerName}</span>
              </div>
              <div className="take-the-number__info">
                <h3>Tên dịch vụ:</h3>
                <span>{number.serviceName}</span>
              </div>
              <div className="take-the-number__info">
                <h3>Số thứ tự:</h3>
                <span>{number.idNumber}</span>
              </div>
              <div className="take-the-number__info">
                <h3>Thời gian cấp:</h3>
                <span>{number.issuanceDate}</span>
              </div>
              <div className="take-the-number__info">
                <h3>Hạn sử dụng:</h3>
                <span>{number.expirationDate}</span>
              </div>
            </Col>
            <Col
              span={12}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="take-the-number__info">
                <h3>Nguồn cấp:</h3>
                <span>{number.source}</span>
              </div>
              <div className="take-the-number__info">
                <h3>Trạng thái:</h3>
                <span>{number.state}</span>
              </div>
              <div className="take-the-number__info">
                <h3>Số điện thoại:</h3>
                <span>{number.phone}</span>
              </div>
              <div className="take-the-number__info">
                <h3>Địa chỉ Email:</h3>
                <span>{number.email}</span>
              </div>
            </Col>
          </Row>
        </Layout>
      </div>
      <Button
        icon={
          <ArrowLeftOutlined
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
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "#FF7506",
            marginTop: "5px",
          }}
        >
          <Link to="/dashboard/take-the-number">Quay lại</Link>
        </span>
      </Button>
    </div>
  );
}

export default TakeTheNumberDetails;
