import { Form, Button, Select, Space } from "antd";
import "./AddTakeTheNumber.css";
import { Modal } from "antd";
import { useState } from "react";

const { Option } = Select;

function AddTakeTheNumber() {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <Button
              htmlType="button"
              type="primary"
              onClick={() => setIsModalOpen(true)}
            >
              In số
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title={
          <div style={{ textAlign: "center", fontSize: "20px" }}>
            Số thứ tự được cấp
          </div>
        }
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: "35px",
            fontWeight: "700",
            color: "#FF7506",
          }}
        >
          2001201
        </h3>
        <p
          style={{
            textAlign: "center",
          }}
        >
          DV: Khám răng hàm mặt (tại quầy số 1)
        </p>
        <div className="time">
          <div className="time_in">
            <span>Thời gian cấp:</span>
            <p>09:30 11/10/2021</p>
          </div>
          <div className="time_out">
            <span>Hạn sử dụng:</span>
            <p>17:30 11/10/2021</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddTakeTheNumber;
