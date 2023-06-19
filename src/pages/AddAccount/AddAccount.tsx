import React, { useEffect, useRef } from "react";
import { Col, Form, Row, Input, Select, Button, message } from "antd";
import Layout from "antd/es/layout/layout";
import "./AddAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { creatAccount } from "../../store/account/accountThunks";
import { AnyAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../store/store";
import { FormInstance } from "antd";
import { createHistoryThunk } from "../../store/history/historyThunks";
import moment from "moment";
import { getIP } from "../../utils/getIP";
import { fetchRoleThunk } from "../../store/role/roleThunks";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function AddAccount() {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleData = useSelector((state: RootState) => state.role.roles);
  const authData = useSelector((state: RootState) => state.auth.user);
  const onFinish = async (values: any) => {
    console.log(values);
    let id = uuidv4();
    dispatch(
      creatAccount(
        id,
        values.fullName,
        values.phoneNumber,
        values.email,
        values.role,
        values.username,
        values.password,
        values.status
      ) as unknown as AnyAction
    )
      .then(() => {
        message.success("Tạo tài khoản thành công");
        formRef.current?.resetFields();
      })
      .catch(() => {
        message.error("Tạo tài khoản thất bại");
      });

    const time = moment().format("HH:mm DD/MM/YYYY");
    const desc = `Thêm tài khoản ${values.username}`;
    try {
      const ip = await getIP();
      console.log(ip);
      dispatch(
        createHistoryThunk(
          authData?.username || "",
          time,
          ip,
          desc
        ) as unknown as AnyAction
      );
    } catch (error) {
      console.log("Lỗi khi lấy địa chỉ IP:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchRoleThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);

  const handleCancel = () => {
    navigate("/dashboard/manager-account");
  };

  return (
    <div className="add-account">
      <h3>Quản lý tài khoản</h3>
      <div className="add-account__content">
        <Layout>
          <Form ref={formRef} onFinish={onFinish}>
            <h3>Thông tin tài khoản</h3>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Họ tên"
                  name="fullName"
                  rules={[{ required: true, message: "Nhập họ tên" }]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không hợp lệ" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                  label="Vai trò"
                  name="role"
                  rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                  labelCol={{ span: 24 }}
                >
                  <Select placeholder="Chọn vai trò">
                    {roleData?.map((role) => (
                      <Option key={role.roleName}>{role.roleName}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  rules={[{ required: true, message: "Nhập tên đăng nhập" }]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Vui lòng nhập lại mật khẩu" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Mật khẩu không khớp"));
                      },
                    }),
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input.Password placeholder="Nhập lại mật khẩu" />
                </Form.Item>
                <Form.Item
                  label="Tình trạng"
                  name="status"
                  rules={[
                    { required: true, message: "Vui lòng chọn tình trạng" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Select placeholder="Chọn tình trạng">
                    <Option value="hoạt động">Hoạt động</Option>
                    <Option value="ngưng hoạt động">Ngưng hoạt động</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="group-btn">
              <Button type="default" onClick={handleCancel}>
                Hủy bỏ
              </Button>
              <Button type="primary" htmlType="submit">
                Thêm tài khoản
              </Button>
            </div>
          </Form>
        </Layout>
      </div>
    </div>
  );
}

export default AddAccount;
