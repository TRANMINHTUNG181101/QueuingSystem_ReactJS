import "./AddRole.css";
import { Col, Layout, Row, Form, Input, Checkbox, Button } from "antd";
const { TextArea } = Input;
function AddRole() {
  return (
    <div className="add-role">
      <h3>Danh sách vai trò</h3>
      <div className="add-role__content">
        <Layout>
          <Form>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Mã thiết bị"
                  name="deviceCode"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Mã thiết bị" />
                </Form.Item>
                <Form.Item
                  label="Mã thiết bị"
                  name="deviceCode"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <TextArea placeholder="Mô tả" rows={7} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="checkbox__content">
                  <h3>Nhóm chức năng A</h3>
                  <Checkbox.Group
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <Checkbox value="allA">Tất cả</Checkbox>
                    <Checkbox value="funcX">Chức năng x</Checkbox>
                    <Checkbox value="funcY">Chức năng y</Checkbox>
                    <Checkbox value="funcZ">Chức năng z</Checkbox>
                  </Checkbox.Group>

                  <h3>Nhóm chức năng B</h3>
                  <Checkbox.Group
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Checkbox value="allB">Tất cả</Checkbox>
                    <Checkbox value="funcX">Chức năng x</Checkbox>
                    <Checkbox value="funcY">Chức năng y</Checkbox>
                    <Checkbox value="funcZ">Chức năng z</Checkbox>
                  </Checkbox.Group>
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
        </Layout>
      </div>
    </div>
  );
}

export default AddRole;
