import { Form, Button, Select, Space } from "antd";
import "./AddTakeTheNumber.css";

const { Option } = Select;

function AddTakeTheNumber() {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
  };
  return (
    <div className="add-ttnumber">
      <div className="add-ttnumber__content">
        <Form onFinish={onFinish} layout="vertical">
          <h3>CẤP SỐ MỚI</h3>
          <p>Dịch vụ khách hàng lựa chọn</p>
          <Form.Item name="selectedService" style={{ width: "300px" }}>
            <Select placeholder="Chọn dịch vụ">
              <Option value="service1">Dịch vụ 1</Option>
              <Option value="service2">Dịch vụ 2</Option>
              <Option value="service3">Dịch vụ 3</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="button">Hủy bỏ</Button>
            <Button htmlType="button" type="primary">
              In số
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddTakeTheNumber;
