import "./LoginPage.css";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography, Space } from "antd";
import ImageLogo from "../../assets/Group.png";

const { Text } = Typography;

function LoginPage() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const onFinish = (values: any) => {
    console.log("Received values:", values);
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleCancelForgotPassword = () => {
    setForgotPassword(false);
    setResetPassword(false);
  };

  const handleResetPassword = () => {
    setResetPassword(true);
  };

  const handleConfirmResetPassword = () => {
    // Perform password reset confirmation logic here
  };

  return (
    <div className="login-page">
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
                  onFinish={onFinish}
                  style={{ width: 300 }}
                >
                  <Form.Item
                    name="newPassword"
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
                    name="confirmNewPassword"
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
                      Cancel
                    </Button>
                    <Button type="primary" onClick={handleConfirmResetPassword}>
                      Confirm
                    </Button>
                  </Space>
                </Form>
              ) : (
                <Form
                  name="forgotPasswordForm"
                  onFinish={onFinish}
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
                      Cancel
                    </Button>
                    <Button type="primary" onClick={handleResetPassword}>
                      Reset Password
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
                  label="Username"
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
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item style={{ textAlign: "left" }}>
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
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </Col>
        <Col span={14}>
          <div className="login-banner">
            <span>Hệ thống</span>
            <h1>QUẢN LÍ XẾP HÀNG</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
