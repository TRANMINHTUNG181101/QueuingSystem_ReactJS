import "./EditDevice.css";
import { Form, Input, Select, Row, Col, Button } from "antd";
const { Option } = Select;
import { useLocation, useNavigate } from "react-router-dom";
import { DeviceInterface } from "../../interfaces/deviceInterface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDeviceThunk } from "../../store/device/deviceThunks";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import moment from "moment";
import { getIP } from "../../utils/getIP";
import { createHistoryThunk } from "../../store/history/historyThunks";

function EditDevice() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { device }: { device: DeviceInterface } = location.state;
  const serviceData = useSelector((state: RootState) => state.service.services);
  const authData = useSelector((state: RootState) => state.auth.user);
  const onFinish = async (values: any) => {
    console.log(
      values.deviceId,
      values.deviceName,
      values.deviceType,
      values.username,
      values.ipAddress,
      values.password,
      values.services
    );
    dispatch(
      updateDeviceThunk(
        values.deviceId,
        values.deviceName,
        values.deviceType,
        values.username,
        values.ipAddress,
        values.password,
        values.services
      ) as unknown as AnyAction
    )
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });

    const time = moment().format("HH:mm DD/MM/YYYY");
    const desc = `Cập nhật thiết bị ${values.deviceName}`;
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
  const handleCancel = () => {
    navigate("/dashboard/device");
  };
  return (
    <div className="edit-device-page">
      <div className="edit-device-page__content">
        <h3>Thông tin thiết bị</h3>
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            deviceId: device.deviceId,
            deviceName: device.deviceName,
            ipAddress: device.ipAddress,
            deviceType: device.deviceType,
            username: device.username,
            password: device.password,
            services: device.services,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mã thiết bị"
                name="deviceId"
                rules={[
                  { required: true, message: "Vui lòng nhập mã thiết bị" },
                ]}
              >
                <Input placeholder="Mã thiết bị" />
              </Form.Item>
              <Form.Item
                label="Tên thiết bị"
                name="deviceName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên thiết bị" },
                ]}
              >
                <Input placeholder="Tên thiết bị" />
              </Form.Item>
              <Form.Item
                label="Địa chỉ IP"
                name="ipAddress"
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ IP" },
                ]}
              >
                <Input placeholder="Địa chỉ IP" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Loại thiết bị"
                name="deviceType"
                rules={[
                  { required: true, message: "Vui lòng chọn loại thiết bị" },
                ]}
              >
                <Select placeholder="Chọn loại thiết bị">
                  <Option value="Kiosk">Kiosk</Option>
                  <Option value="Display counter">Display counter</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập" },
                ]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Dịch vụ sử dụng"
                name="services"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn dịch vụ sử dụng",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Chọn dịch vụ sử dụng">
                  {serviceData?.map((service) => (
                    <Option key={service.serviceName}>
                      {service.serviceName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="group-btn">
            <Button type="default" onClick={handleCancel}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit">
              Cập nhật thiết bị
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditDevice;
