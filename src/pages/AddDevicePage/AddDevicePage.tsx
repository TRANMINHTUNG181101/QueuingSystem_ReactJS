import "./AddDevicePage.css";
import { Form, Input, Select, Row, Col, Button } from "antd";
const { Option } = Select;
function AddDevicePage() {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
  };
  return (
    <div className="add-device-page">
      <div className="add-device-page__content">
        <h3>Thông tin thiết bị</h3>
        <Form onFinish={onFinish} layout="vertical">
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
                  <Option value="type1">Loại 1</Option>
                  <Option value="type2">Loại 2</Option>
                  <Option value="type3">Loại 3</Option>
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
                  <Option>Dịch vụ 1</Option>
                  <Option value="service2">Dịch vụ 2</Option>
                  <Option value="service3">Dịch vụ 3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="group-btn">
            <Button type="default">Hủy bỏ</Button>
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
