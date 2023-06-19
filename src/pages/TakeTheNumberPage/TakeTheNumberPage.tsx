import { Layout, Input, Select, Table, Button, DatePicker } from "antd";
import "./TakeTheNumberPage.css";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { fetchNumberThunk } from "../../store/number/numberThunks";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment, { Moment } from "moment";
import FilterNumbering from "../../components/FilterNumbering/FilterNumbering";

const { Content } = Layout;

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "issuanceDate",
    key: "issuanceDate",
  },
  {
    title: "Hạn sử dụng",
    dataIndex: "expirationDate",
    key: "expirationDate",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Nguồn cấp",
    dataIndex: "source",
    key: "source",
  },
  {
    title: " ",
    dataIndex: "detail",
    key: "detail",
    render: (text: any, record: any) => (
      <Link
        to="/dashboard/take-the-number/take-the-number-details"
        state={{ number: record }}
      >
        Chi tiết
      </Link>
    ),
  },
];

const pagination = {
  pageSize: 7,
};

function TakeTheNumberPage() {
  const dispatch = useDispatch();
  const numberData = useSelector((state: RootState) => state.number.numbers);
  const serviceData = useSelector((state: RootState) => state.service.services);
  const [selectedService, setSelectedService] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [startDate, setStartDate] = useState<Moment | null>(
    moment().startOf("month")
  );
  const [endDate, setEndDate] = useState<Moment | null>(
    moment().endOf("month")
  );
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchNumberThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);
  const modifiedNumberData = numberData.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));

  const handleServiceChange = (value: any) => {
    setSelectedService(value);
  };

  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
  };

  const handleSourceChange = (value: any) => {
    setSelectedSource(value);
  };

  const handleStartDateChange = (value: any) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: any) => {
    setEndDate(value);
  };

  const handleSearchKeywordChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  const filteredData = modifiedNumberData.filter((item) => {
    const isServiceMatched =
      selectedService === "all" || item.serviceName === selectedService;
    const isStatusMatched =
      selectedStatus === "all" || item.state === selectedStatus;
    const isSourceMatched =
      selectedSource === "all" || item.source === selectedSource;
    const isKeywordMatched =
      item.customerName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.serviceName.toLowerCase().includes(searchKeyword.toLowerCase());

    const startDateObj = startDate?.format("DD-MM-YYYY");
    const endDateObj = endDate?.format("DD-MM-YYYY");
    const startTime = item.issuanceDate.split(" ")[1];
    const startDateParse = moment(startDateObj, "D/M/YYYY");
    const endDateParse = moment(endDateObj, "D/M/YYYY");
    const dateToCheck = moment(startTime, "D/M/YYYY");

    const isDateMatched =
      !startDateParse ||
      !endDateParse ||
      (dateToCheck &&
        moment(dateToCheck, "DD/MM/YYYY").isBetween(
          startDateParse.startOf("day"),
          endDateParse.endOf("day"),
          undefined,
          "[]"
        ));

    return (
      isServiceMatched &&
      isStatusMatched &&
      isSourceMatched &&
      isDateMatched &&
      isKeywordMatched
    );
  });

  return (
    <Layout>
      <Content style={{ padding: "16px" }}>
        <FilterNumbering
          selectedService={selectedService}
          selectedStatus={selectedStatus}
          selectedSource={selectedSource}
          startDate={startDate}
          endDate={endDate}
          searchKeyword={searchKeyword}
          handleServiceChange={handleServiceChange}
          handleStatusChange={handleStatusChange}
          handleSourceChange={handleSourceChange}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleSearchKeywordChange={handleSearchKeywordChange}
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          bordered
          style={{ width: "100%" }}
          pagination={pagination}
        />
      </Content>
      <Button
        icon={
          <PlusOutlined
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
        <span style={{ fontSize: "12px", fontWeight: "700", color: "#FF7506" }}>
          <Link
            to="/dashboard/take-the-number/add-take-the-number"
            style={{ color: "#FF7506" }}
          >
            Cấp <br />
            số mới
          </Link>
        </span>
      </Button>
    </Layout>
  );
}

export default TakeTheNumberPage;
