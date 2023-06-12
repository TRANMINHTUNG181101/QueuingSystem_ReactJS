import "./InfoPage.css";
import { Row, Col, Input } from "antd";
import ImageAvatar from "../../assets/unsplash_Fyl8sMC2j2Q.png";

const { TextArea } = Input;
function InfoPage() {
  return (
    <div className="info-page">
      <div className="info-page__content">
        <Row gutter={16} justify="center">
          <Col
            span={8}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <img src={ImageAvatar} alt="" />
            <label
              htmlFor="avatar"
              style={{ fontSize: "20px", fontWeight: "700" }}
            >
              Lê Quỳnh Bảo Vân
            </label>
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label htmlFor="username" style={{ textAlign: "left" }}>
              Tên người dùng
            </label>
            <Input id="username" value="Lê Quỳnh Ái Vân" disabled />
            <label htmlFor="phone" style={{ textAlign: "left" }}>
              Số điện thoại
            </label>
            <Input id="phone" value="0123456789" disabled />
            <label htmlFor="email" style={{ textAlign: "left" }}>
              Email
            </label>
            <Input id="email" value="example@example.com" disabled />
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label htmlFor="login" style={{ textAlign: "left" }}>
              Tên đăng nhập
            </label>
            <Input id="login" value="example_user" disabled />
            <label htmlFor="password" style={{ textAlign: "left" }}>
              Mật khẩu
            </label>
            <Input.Password id="password" value="********" disabled />
            <label htmlFor="role" style={{ textAlign: "left" }}>
              Vai trò
            </label>
            <Input id="role" value="admin" disabled />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default InfoPage;
