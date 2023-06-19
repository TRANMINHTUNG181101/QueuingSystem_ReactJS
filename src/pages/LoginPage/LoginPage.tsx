import "./LoginPage.css";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Space,
  message,
  Alert,
} from "antd";
import ImageLogo from "../../assets/Group.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth/authThunks";
import { AnyAction } from "redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { checkEmail } from "../../firebase/auth/checkEmail";
import { forgotPasswordAccount } from "../../firebase/auth/forgot";

const { Text } = Typography;

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [email, setEmail] = useState("");
  const authData = useSelector((state: RootState) => state.auth.user);

  const onFinish = async (values: any) => {
    dispatch(
      loginUser(values.username, values.password) as unknown as AnyAction
    )
      .then(() => {
        if (authData) {
          navigate("/dashboard");
          console.log("Đăng nhập thành công");
        } else {
          console.log(loginError);
          setLoginError(true);
        }
      })
      .catch(() => {
        console.log("Đăng nhập thất bại");
      });
  };

  const handleCheckEmail = async (values: any) => {
    const email = values.email;
    try {
      const isValid = await checkEmail(email);
      console.log(isValid);
      setIsEmailValid(isValid);
      setEmail(email);

      if (isValid) {
        setResetPassword(true);
      } else {
        message.error("Email không hợp lệ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleCancelForgotPassword = () => {
    setForgotPassword(false);
    setResetPassword(false);
  };
  let isUpdating = false;
  const handleConfirmResetPassword = async (values: any) => {
    if (values.newPassword !== values.confirmNewPassword) {
      console.log("Mật khẩu không khớp!");
      return;
    }

    try {
      isUpdating = true;
      await forgotPasswordAccount(email, values.newPassword);
      console.log("Cập nhật mật khẩu thành công!");
    } catch (error) {
      console.log("Cập nhật mật khẩu thất bại:", error);
    } finally {
      isUpdating = false;
    }
  };

  useEffect(() => {
    if (authData) {
      navigate("/dashboard");
    }
  }, [authData, navigate]);

  return (
    <div className={`login-page ${forgotPassword ? "forgot-password" : ""}`}>
      <Row style={{ height: "100vh" }}>
        <Col span={10}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
            className="login-form"
          >
            <img src={ImageLogo} alt="" />
            {forgotPassword ? (
              resetPassword ? (
                <Form
                  name="resetPasswordForm"
                  onFinish={handleConfirmResetPassword}
                  style={{ width: 300 }}
                >
                  <Form.Item
                    label="Mật khẩu"
                    name="newPassword"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input a new password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="New Password" />
                  </Form.Item>
                  <Form.Item
                    label="Nhập lại mật khẩu"
                    name="confirmNewPassword"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm the new password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Confirm New Password" />
                  </Form.Item>

                  <Space>
                    <Button
                      onClick={handleCancelForgotPassword}
                      style={{ marginLeft: "10px" }}
                    >
                      Hủy
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Xác nhận
                    </Button>
                  </Space>
                </Form>
              ) : (
                <Form
                  name="forgotPasswordForm"
                  onFinish={handleCheckEmail}
                  style={{ width: 300 }}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Space>
                    <Button
                      onClick={handleCancelForgotPassword}
                      style={{ marginLeft: "10px" }}
                    >
                      Hủy
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Tiếp tục
                    </Button>
                  </Space>
                </Form>
              )
            ) : (
              <Form
                name="loginForm"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ width: 300 }}
              >
                <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                {loginError && (
                  <div className="login-error">
                    <Alert
                      message="Sai mật khẩu hoặc tên đăng nhập"
                      type="error"
                      showIcon
                      closable
                    />
                  </div>
                )}
                <Form.Item style={{ textAlign: "left", cursor: "pointer" }}>
                  <Text type="secondary" onClick={handleForgotPassword}>
                    Quên mật khẩu?
                  </Text>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </Col>
        <Col span={14}>
          <div className="login-banner">
            {forgotPassword ? (
              ""
            ) : (
              <>
                <span>Hệ thống</span>
                <h1>QUẢN LÍ XẾP HÀNG</h1>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
