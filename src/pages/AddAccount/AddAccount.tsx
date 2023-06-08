import "./AddAccount.css";
import { Col, Form, Row, Input, Select, Button } from "antd";
const { Option } = Select;
import Layout from "antd/es/layout/layout";

function AddAccount() {
  return (
    <div className="add-account">
      <h3>Quản lý tài khoản</h3>
      <div className="add-account__content">
        <Layout>
          <Form>
            <h3>Thông tin tài khoản</h3>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Họ tên"
                  name="deviceCode"
                  rules={[{ required: true, message: "Nhập họ tên" }]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="deviceCode"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="deviceCode"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                  label="Vai trò"
                  name="deviceCode"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Chọn vai trò" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Họ tên"
                  name="deviceCode"
                  rules={[{ required: true, message: "Nhập họ tên" }]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="deviceCode"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="deviceCode"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                  label="Vai trò"
                  name="deviceCode"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Select>
                    <Option value="active">Vai trò A</Option>
                    <Option value="inactive">Vai trò B</Option>
                    <Option value="inactive">Vai trò C</Option>
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
        </Layout>
      </div>
    </div>
  );
}

export default AddAccount;
