import "./AddDevicePage.css";
import React, { useEffect, useRef } from "react";
import { Form, Input, Select, Row, Col, Button, message } from "antd";
const { Option } = Select;
import { useDispatch, useSelector } from "react-redux";
import { sendDevice } from "../../store/device/deviceThunks";
import { AnyAction } from "redux";
import { RootState } from "../../store/store";
import { FormInstance } from "antd";
import { fetchServiceThunk } from "../../store/service/serviceThunks";
import moment from "moment";
import { getIP } from "../../utils/getIP";
import { createHistoryThunk } from "../../store/history/historyThunks";
import { useNavigate } from "react-router-dom";

function AddDevicePage() {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state: RootState) => state.auth.user);
  const onFinish = async (values: any) => {
    let stateActive = "Ngưng hoạt động";
    let stateConnect = "Mất kết nối";
    dispatch(
      sendDevice(
        values.deviceCode,
        values.deviceName,
        values.deviceType,
        values.username,
        values.ipAddress,
        values.password,
        stateActive,
        stateConnect,
        values.services
      ) as unknown as AnyAction
    )
      .then(() => {
        message.success("Thêm thiết bị thành công");
        formRef.current?.resetFields();
      })
      .catch(() => {
        message.error("Thêm thiết bị thất bại");
      });
    const time = moment().format("HH:mm DD/MM/YYYY");
    const desc = `Thêm thiết bị ${values.deviceName}`;
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
  const serviceData = useSelector((state: RootState) => state.service.services);

  useEffect(() => {
    dispatch(fetchServiceThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);

  const handleCancel = () => {
    navigate("/dashboard/device");
  };
  return (
    <div className="add-device-page">
      <div className="add-device-page__content">
        <h3>Thông tin thiết bị</h3>
        <Form ref={formRef} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mã thiết bị"
                name="deviceCode"
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
                  { required: true, message: "Vui lòng chọn dịch vụ sử dụng" },
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
              Thêm thiết bị
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddDevicePage;
