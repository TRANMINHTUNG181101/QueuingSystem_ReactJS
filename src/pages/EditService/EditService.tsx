import { Form, Input, Row, Col, Button, Typography, Checkbox } from "antd";
const { TextArea } = Input;
const { Title } = Typography;
import "./EditService.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ServiceInterface } from "../../interfaces/serviceInterface";
import { updateServiceThunk } from "../../store/service/serviceThunks";
import { AnyAction } from "redux";
import moment from "moment";
import { getIP } from "../../utils/getIP";
import { createHistoryThunk } from "../../store/history/historyThunks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function EditService() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { service }: { service: ServiceInterface } = location.state;
  const authData = useSelector((state: RootState) => state.auth.user);

  const onFinish = async (values: any) => {
    console.log(
      values.serviceCode,
      values.serviceName,
      values.description,
      values.autoIncreaseFrom,
      values.autoIncreaseTo,
      values.prefix,
      values.suffix || " "
    );
    dispatch(
      updateServiceThunk(
        values.autoIncreaseFrom,
        values.autoIncreaseTo,
        values.description,
        values.prefix,
        values.serviceCode,
        values.serviceName,
        values.suffix
      ) as unknown as AnyAction
    )
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });

    const time = moment().format("HH:mm DD/MM/YYYY");
    const desc = `Cập nhật dịch vụ ${values.serviceName}`;
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
    <div className="edit-service-page">
      <div className="edit-service-page__content">
        <Title level={4} className="title">
          Thông tin dịch vụ
        </Title>
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            serviceCode: service.serviceCode,
            serviceName: service.serviceName,
            description: service.description,
            autoIncreaseFrom: service.autoIncreaseFrom,
            autoIncreaseTo: service.autoIncreaseTo,
            prefix: service.prefix,
            suffix: service.suffix,
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
                    <Input style={{ width: "40px" }} />
                  </Form.Item>
                  <Form.Item name="autoIncreaseTo">
                    <Input style={{ width: "40px" }} />
                  </Form.Item>
                </div>
                <div className="check__item">
                  <Form.Item>
                    <Checkbox />
                  </Form.Item>
                  <h3 style={{ marginBottom: "25px" }}>Prefix:</h3>
                  <Form.Item name="prefix">
                    <Input style={{ width: "40px" }} />
                  </Form.Item>
                </div>
                <div className="check__item">
                  <Form.Item>
                    <Checkbox />
                  </Form.Item>
                  <h3 style={{ marginBottom: "25px" }}>Surfix:</h3>
                  <Form.Item name="suffix">
                    <Input style={{ width: "40px" }} />
                  </Form.Item>
                </div>
                <h3 style={{ textAlign: "left" }}>Reset mỗi ngày</h3>
              </div>
            </Col>
          </Row>
          <div className="group-btn">
            <Button type="default" onClick={handleCancel}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit">
              Cập nhật dịch vụ
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditService;
