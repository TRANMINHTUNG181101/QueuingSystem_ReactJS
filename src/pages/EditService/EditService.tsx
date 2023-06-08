import { Form, Input, Row, Col, Button, Typography, Checkbox } from "antd";
const { TextArea } = Input;
const { Title } = Typography;
import "./EditService.css";
function EditService() {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
  };
  return (
    <div className="edit-service-page">
      <div className="edit-service-page__content">
        <Title level={4} className="title">
          Thông tin dịch vụ
        </Title>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Mã dịch vụ"
              name="serviceCode"
              rules={[{ required: true, message: "Vui lòng nhập mã dịch vụ" }]}
              labelCol={{ span: 24 }}
            >
              <Input placeholder="Mã dịch vụ" />
            </Form.Item>
            <Form.Item
              label="Tên dịch vụ"
              name="serviceName"
              rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
              labelCol={{ span: 24 }}
            >
              <Input placeholder="Tên dịch vụ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              labelCol={{ span: 24 }}
            >
              <TextArea placeholder="Mô tả" rows={5} />
            </Form.Item>
          </Col>
        </Row>
        <Title level={4} className="title">
          Quy tắc cấp số
        </Title>
        <Form onFinish={onFinish} layout="vertical">
          <Row>
            <Col span={24}>
              <div className="check__content">
                <div className="check__item">
                  <Checkbox />
                  <h3>Tăng tự động từ</h3>
                  <Input style={{ width: "40px" }} />
                  <Input style={{ width: "40px" }} />
                </div>
                <div className="check__item">
                  <Checkbox />
                  <h3>Prefix:</h3>
                  <Input style={{ width: "40px" }} />
                  <Input style={{ width: "40px" }} />
                </div>
                <div className="check__item">
                  <Checkbox />
                  <h3>Surfix:</h3>
                  <Input style={{ width: "40px" }} />
                  <Input style={{ width: "40px" }} />
                </div>
                <div className="check__item">
                  <Checkbox />
                  <h3>Reset mỗi ngày</h3>
                </div>
              </div>
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

export default EditService;
