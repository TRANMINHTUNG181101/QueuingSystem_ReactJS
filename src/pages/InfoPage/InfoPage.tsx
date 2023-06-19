import "./InfoPage.css";
import { Row, Col, Input } from "antd";
import ImageAvatar from "../../assets/unsplash_Fyl8sMC2j2Q.png";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const { TextArea } = Input;
function InfoPage() {
  const auth = useSelector((state: RootState) => state.auth.user);
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
              {auth?.fullName}
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
            <Input id="username" disabled value={auth?.fullName} />
            <label htmlFor="phone" style={{ textAlign: "left" }}>
              Số điện thoại
            </label>
            <Input id="phone" value={auth?.phoneNumber} disabled />
            <label htmlFor="email" style={{ textAlign: "left" }}>
              Email
            </label>
            <Input id="email" value={auth?.email} disabled />
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
            <Input id="login" value={auth?.username} disabled />
            <label htmlFor="password" style={{ textAlign: "left" }}>
              Mật khẩu
            </label>
            <Input.Password id="password" value={auth?.password} disabled />
            <label htmlFor="role" style={{ textAlign: "left" }}>
              Vai trò
            </label>
            <Input id="role" value={auth?.role} disabled />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default InfoPage;
