import React, { useRef } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  Checkbox,
  message,
} from "antd";
import "./AddSevicePage.css";
import { FormInstance } from "antd";

import { useDispatch } from "react-redux";
import { sendService } from "../../store/service/serviceThunks";
import { AnyAction } from "redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import moment from "moment";
import { createHistoryThunk } from "../../store/history/historyThunks";
import { getIP } from "../../utils/getIP";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Title } = Typography;

function AddSevicePage() {
  const formRef = useRef<FormInstance>(null);
  const authData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    dispatch(
      sendService(
        values.autoIncreaseFrom || null,
        values.autoIncreaseTo || null,
        values.description,
        values.prefix || null,
        values.serviceCode,
        values.serviceName,
        values.suffix || null
      ) as unknown as AnyAction
    )
      .then(() => {
        message.success("Thêm dịch vụ thành công");
        formRef.current?.resetFields();
      })
      .catch(() => {
        message.error("Thêm dịch vụ thất bại");
      });

    const time = moment().format("HH:mm DD/MM/YYYY");
    const desc = `Thêm dịch vụ ${values.serviceName}`;
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
  let autoIncreaseFrom = "0001";
  let autoIncreaseTo = "9999";
  let prefix = "0001";
  let suffix = "0001";

  const handleCancel = () => {
    navigate("/dashboard/service");
  };

  return (
    <div className="add-service-page">
      <div className="add-service-page__content">
        <Title level={4} className="title">
          Thông tin dịch vụ
        </Title>
        <Form
          ref={formRef}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            autoIncreaseFrom: autoIncreaseFrom,
            autoIncreaseTo: autoIncreaseTo,
            prefix: prefix,
            suffix: suffix,
          }}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Mã dịch vụ"
                name="serviceCode"
                rules={[
                  { required: true, message: "Vui lòng nhập mã dịch vụ" },
                ]}
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Mã dịch vụ" />
              </Form.Item>
              <Form.Item
                label="Tên dịch vụ"
                name="serviceName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên dịch vụ" },
                ]}
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
          <Row>
            <Col span={24}>
              <div className="check__content">
                <div className="check__item">
                  <Form.Item>
                    <Checkbox />
                  </Form.Item>
                  <h3 style={{ marginBottom: "25px" }}>Tăng tự động từ</h3>
                  <Form.Item name="autoIncreaseFrom">
                    <Input style={{ width: "60px" }} />
                  </Form.Item>
                  <Form.Item name="autoIncreaseTo">
                    <Input style={{ width: "60px" }} />
                  </Form.Item>
                </div>
                <div className="check__item">
                  <Form.Item>
                    <Checkbox />
                  </Form.Item>
                  <h3 style={{ marginBottom: "25px" }}>Prefix:</h3>
                  <Form.Item name="prefix">
                    <Input style={{ width: "60px" }} />
                  </Form.Item>
                </div>
                <div className="check__item">
                  <Form.Item>
                    <Checkbox />
                  </Form.Item>
                  <h3 style={{ marginBottom: "25px" }}>Surfix:</h3>
                  <Form.Item name="suffix">
                    <Input style={{ width: "60px" }} />
                  </Form.Item>
                </div>
                <div className="check__item">
                  <Form.Item>
                    <Checkbox />
                  </Form.Item>
                  <h3 style={{ marginBottom: "25px" }}>Reset mỗi ngày</h3>
                </div>
              </div>
            </Col>
          </Row>
          <div className="group-btn">
            <Button type="default" onClick={handleCancel}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit">
              Thêm dịch vụ
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddSevicePage;
