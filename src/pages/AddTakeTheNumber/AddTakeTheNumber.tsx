import { Form, Button, Select, Space } from "antd";
import "./AddTakeTheNumber.css";
import { Modal } from "antd";
import { useState } from "react";
import moment from "moment";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { creatNumber } from "../../store/number/numberThunks";
import { AnyAction } from "redux";
import { getIP } from "../../utils/getIP";
import { createHistoryThunk } from "../../store/history/historyThunks";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function generateRandomNumber(length: number): string {
  let randomNumber = "";
  const characters = "0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    randomNumber += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return randomNumber;
}

function AddTakeTheNumber() {
  const [selectedService, setSelectedService] = useState<string>("");
  const auth = useSelector((state: RootState) => state.auth.user);
  const issuanceDate = moment().format("HH:mm DD/MM/YYYY");
  const expirationDate = moment().add(8, "hours").format("HH:mm DD/MM/YYYY");
  const customerName = auth?.fullName || "";
  const state = "Đang chờ";
  const idNumber = generateRandomNumber(7);
  const source = "Kiosk";
  const phone = auth?.phoneNumber || "";
  const email = auth?.email || "";
  const serviceData = useSelector((state: RootState) => state.service.services);
  const authData = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const service = values.service;
    dispatch(
      creatNumber(
        idNumber,
        customerName,
        service,
        issuanceDate,
        expirationDate,
        state,
        source,
        phone,
        email
      ) as unknown as AnyAction
    )
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
    const time = moment().format("HH:mm DD/MM/YYYY");
    const desc = `Cấp số ${idNumber}`;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    navigate("/dashboard/take-the-number");
  };
  return (
    <div className="add-ttnumber">
      <div className="add-ttnumber__content">
        <Form onFinish={onFinish} layout="vertical">
          <h3>CẤP SỐ MỚI</h3>
          <p>Dịch vụ khách hàng lựa chọn</p>
          <Form.Item name="service" style={{ width: "300px" }}>
            <Select
              placeholder="Chọn dịch vụ"
              value={selectedService}
              onChange={(value) => setSelectedService(value)}
            >
              {serviceData?.map((service) => (
                <Option key={service.serviceName}>{service.serviceName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="button" onClick={handleCancel}>
              Hủy bỏ
            </Button>
            <Button
              htmlType="submit"
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
          {idNumber}
        </h3>
        <p
          style={{
            textAlign: "center",
          }}
        >
          DV: {selectedService}
        </p>
        <div className="time">
          <div className="time_in">
            <span>Thời gian cấp:</span>
            <p>{issuanceDate}</p>
          </div>
          <div className="time_out">
            <span>Hạn sử dụng:</span>
            <p>{expirationDate}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddTakeTheNumber;
