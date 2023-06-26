import React, { useState, useRef } from "react";
import { Col, Layout, Row, Form, Input, Checkbox, Button } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
const { TextArea } = Input;
import { v4 as uuidv4 } from "uuid";
import "./EditRole.css";
import { useDispatch } from "react-redux";
import { creatRole } from "../../store/role/roleThunks";
import { AnyAction } from "redux";
import { RoleInterface } from "../../interfaces/roleInterface";
import { useLocation, useNavigate } from "react-router-dom";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { updateRoleThunk } from "../../store/role/roleThunks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import moment from "moment";
import { getIP } from "../../utils/getIP";
import { createHistoryThunk } from "../../store/history/historyThunks";

const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];
const defaultCheckedList = ["Chức năng x", "Chức năng y"];

function EditRole() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role }: { role: RoleInterface } = location.state;
  const authData = useSelector((state: RootState) => state.auth.user);
  const [checkedListA, setCheckedListA] = useState<CheckboxValueType[]>(
    role?.groupA
  );
  const [indeterminateA, setIndeterminateA] = useState(true);
  const [checkAllA, setCheckAllA] = useState(false);

  const [checkedListB, setCheckedListB] = useState<CheckboxValueType[]>(
    role?.groupB
  );
  const [indeterminateB, setIndeterminateB] = useState(true);
  const [checkAllB, setCheckAllB] = useState(false);
  const onFinish = async (values: any) => {
    console.log(values);
    const groupA = checkedListA.map((value) => String(value));
    const groupB = checkedListB.map((value) => String(value));
    dispatch(
      updateRoleThunk(
        values.idRole,
        values.roleName,
        values.description,
        groupA,
        groupB
      ) as unknown as AnyAction
    )
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });

    const time = moment().format("HH:mm DD/MM/YYYY");
    const desc = `Cập nhật vai trò ${values.roleName}`;
    try {
      const ip = await getIP();
      dispatch(
        createHistoryThunk(
          authData?.username || "",
          time,
          ip,
          desc
        ) as unknown as AnyAction
      );
      navigate("/dashboard/manager-role");
    } catch (error) {
      console.log("Lỗi khi lấy địa chỉ IP:", error);
    }
  };

  const onChangeGroupA = (list: CheckboxValueType[]) => {
    setCheckedListA(list);
    setIndeterminateA(!!list.length && list.length < plainOptions.length);
    setCheckAllA(list.length === plainOptions.length);
  };

  const onCheckAllGroupA = (e: CheckboxChangeEvent) => {
    setCheckedListA(e.target.checked ? plainOptions : []);
    setIndeterminateA(false);
    setCheckAllA(e.target.checked);
  };

  const onChangeGroupB = (list: CheckboxValueType[]) => {
    setCheckedListB(list);
    setIndeterminateB(!!list.length && list.length < plainOptions.length);
    setCheckAllB(list.length === plainOptions.length);
  };

  const onCheckAllGroupB = (e: CheckboxChangeEvent) => {
    setCheckedListB(e.target.checked ? plainOptions : []);
    setIndeterminateB(false);
    setCheckAllB(e.target.checked);
  };
  const handleCancel = () => {
    navigate("/dashboard/manager-role");
  };
  return (
    <div className="add-role">
      <h3>Danh sách vai trò</h3>
      <div className="add-role__content">
        <Layout>
          <Form
            onFinish={onFinish}
            initialValues={{
              idRole: role.idRole,
              roleName: role.roleName,
              description: role.description,
            }}
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item name="idRole" style={{ display: "none" }}>
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  label="Tên vai trò"
                  name="roleName"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên vai trò" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Tên vai trò" />
                </Form.Item>
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                  labelCol={{ span: 24 }}
                >
                  <TextArea placeholder="Mô tả" rows={7} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="checkbox__content">
                  <h3>Nhóm chức năng A</h3>
                  <Form.Item style={{ display: "flex" }}>
                    <Checkbox
                      indeterminate={indeterminateA}
                      onChange={onCheckAllGroupA}
                      checked={checkAllA}
                      style={{
                        display: "flex",
                        marginLeft: "0px",
                        marginBottom: "10px",
                      }}
                    >
                      Tất cả
                    </Checkbox>
                    <Checkbox.Group
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                      options={plainOptions}
                      value={checkedListA}
                      onChange={onChangeGroupA}
                    ></Checkbox.Group>
                  </Form.Item>

                  <h3>Nhóm chức năng B</h3>
                  <Form.Item style={{ display: "flex" }}>
                    <Checkbox
                      indeterminate={indeterminateB}
                      onChange={onCheckAllGroupB}
                      checked={checkAllB}
                      style={{
                        display: "flex",
                        marginLeft: "0px",
                        marginBottom: "10px",
                      }}
                    >
                      Tất cả
                    </Checkbox>
                    <Checkbox.Group
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                      options={plainOptions}
                      value={checkedListB}
                      onChange={onChangeGroupB}
                    ></Checkbox.Group>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div className="group-btn">
              <Button type="default" onClick={handleCancel}>
                Hủy bỏ
              </Button>
              <Button type="primary" htmlType="submit">
                Chỉnh sửa
              </Button>
            </div>
          </Form>
        </Layout>
      </div>
    </div>
  );
}

export default EditRole;
