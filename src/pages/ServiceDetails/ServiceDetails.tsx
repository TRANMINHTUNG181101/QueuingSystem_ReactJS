import {
  Col,
  Input,
  Layout,
  Row,
  Select,
  DatePicker,
  Table,
  Button,
} from "antd";
import "./ServiceDetails.css";
import { SearchOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { ServiceInterface } from "../../interfaces/serviceInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { NumberingInterface } from "../../interfaces/numberInterface";
import { useDispatch } from "react-redux";
import { fetchNumberThunk } from "../../store/number/numberThunks";
import { AnyAction } from "redux";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

function ServiceDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { service }: { service: ServiceInterface } = location.state;
  const numberData = useSelector((state: RootState) => state.number.numbers);
  const [data, setData] = useState<NumberingInterface[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    status: "",
    source: "",
    date: null,
    keyword: "",
  });

  useEffect(() => {
    dispatch(fetchNumberThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });

    const filteredData = numberData.filter(
      (number) => number.serviceName === service.serviceName
    );
    setData(filteredData);
  }, []);
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "idNumber",
      key: "idNumber",
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
    },
  ];
  const pagination = {
    pageSize: 5,
  };
  const handleStatusChange = (value: any) => {
    setFilterOptions({ ...filterOptions, status: value });
  };

  const handleSourceChange = (value: any) => {
    setFilterOptions({ ...filterOptions, source: value });
  };

  const handleDateChange = (value: any) => {
    setFilterOptions({ ...filterOptions, date: value });
  };

  const handleKeywordChange = (e: any) => {
    const keyword = e.target.value;
    setFilterOptions({ ...filterOptions, keyword });
  };
  useEffect(() => {
    const filteredData = numberData.filter((number) => {
      const matchesStatus =
        !filterOptions.status || number.state === filterOptions.status;
      const matchesSource =
        !filterOptions.source || number.source === filterOptions.source;
      const matchesDate =
        !filterOptions.date || number.issuanceDate === filterOptions.date;
      const matchesKeyword =
        !filterOptions.keyword ||
        number.idNumber.includes(filterOptions.keyword);
      return matchesStatus && matchesSource && matchesDate && matchesKeyword;
    });
    setData(filteredData);
  }, [filterOptions, numberData]);

  return (
    <div className="service-details">
      <div className="service-details__content">
        <Layout>
          <Row style={{ gap: "20px" }}>
            <Col
              span={8}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                alignItems: "flex-start",
                gap: "10px",
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <h3>Thông tin dịch vụ</h3>
              <div className="device__info">
                <h3>Mã dịch vụ:</h3>
                <span>{service.serviceCode}</span>
              </div>
              <div className="device__info">
                <h3>Tên dịch vụ:</h3>
                <span>{service.serviceName}</span>
              </div>
              <div className="device__info">
                <h3>Mô tả:</h3>
                <span>{service.description}</span>
              </div>
              <h3 style={{ marginTop: "20px" }}>Quy tắc cấp số</h3>
              <div className="device__info">
                <h3>Tăng tự động</h3>
                <Input
                  style={{ width: "55px" }}
                  value={service?.autoIncreaseFrom ?? undefined}
                />
                <span>đến</span>
                <Input
                  style={{ width: "55px" }}
                  value={service?.autoIncreaseTo ?? undefined}
                />
              </div>
              <div className="device__info">
                <h3>Prefix:</h3>
                <Input
                  style={{ width: "55px" }}
                  value={service.prefix !== null ? service.prefix : undefined}
                />
              </div>
              <div className="device__info">
                <h3>Suffix:</h3>
                <Input
                  style={{ width: "55px" }}
                  value={service.suffix !== null ? service.suffix : undefined}
                />
              </div>
              <div className="device__info">
                <h3>Reset mỗi ngày</h3>
              </div>
            </Col>
            <Col
              span={15}
              style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "20px",
                marginLeft: "10px !important",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    marginRight: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span>Tình trạng</span>
                  <Select
                    style={{ width: "100px" }}
                    onChange={handleStatusChange}
                  >
                    <Option value="Đã sử dụng">Đã sử dụng</Option>
                    <Option value="Đang chờ">Đang chờ</Option>
                    <Option value="Bỏ qua">Bỏ qua</Option>
                  </Select>
                </div>
                <div
                  style={{
                    marginRight: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span>Nguồn cấp</span>
                  <Select
                    style={{ width: "100px" }}
                    onChange={handleSourceChange}
                  >
                    <Option value="Kiosk">Kiosk</Option>
                    <Option value="Display counter">Display counter</Option>
                  </Select>
                </div>
                <div
                  style={{
                    marginRight: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    borderRadius: "20px",
                  }}
                >
                  <span>Chọn thời gian</span>
                  <DatePicker />
                </div>
                <div
                  style={{
                    marginRight: "16px",
                    marginTop: "25px",
                  }}
                >
                  <DatePicker />
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span>Từ khóa:</span>
                  <Input
                    style={{ width: "150px" }}
                    prefix={
                      <SearchOutlined
                        style={{ color: "#FF7506", marginLeft: "auto" }}
                      />
                    }
                    onChange={handleKeywordChange}
                  />
                </div>
              </div>
              <Table
                dataSource={data}
                columns={columns}
                pagination={pagination}
              />
            </Col>
          </Row>
        </Layout>
      </div>
      <Button
        icon={
          <EditOutlined
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#FF9138",
              color: "#FFF2E7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          />
        }
        style={{
          position: "absolute",
          right: "0px",
          top: "15%",
          width: "60px",
          height: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#FFF2E7 !important",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "#FF7506",
          }}
        >
          <Link
            to="/dashboard/service/edit-service"
            style={{ color: "#FF7506" }}
            state={{ service: service }}
          >
            Cập nhật
            <br />
            danh sách
          </Link>
        </span>
      </Button>
      <Button
        icon={
          <LeftOutlined
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#FF9138",
              color: "#FFF2E7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          />
        }
        style={{
          position: "absolute",
          right: "0px",
          top: "26%",
          width: "60px",
          height: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#FFF2E7 !important",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "#FF7506",
          }}
        >
          <Link 
            to="/dashboard/service" 
            style={{ color: "#FF7506" }}
            state={{ service: service }}
          >
            Quay lại
          </Link>
        </span>
      </Button>
    </div>
  );
}

export default ServiceDetails;
