import React, { useState } from "react";
import { Layout, DatePicker, Select, Table, Button } from "antd";
import "./ReportPage.css";
import { DownloadOutlined } from "@ant-design/icons";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import moment, { Moment } from "moment";
import { CSVLink } from "react-csv";

const { Content } = Layout;

interface DataItem {
  key: string;
  stt: number;
  customerName: string;
  serviceName: string;
  startTime: string;
  expirationDate: string;
  status: string;
  source: string;
}

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    sorter: (a: DataItem, b: DataItem) => a.stt - b.stt,
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "serviceName",
    key: "serviceName",
    sorter: (a: DataItem, b: DataItem) =>
      a.serviceName.localeCompare(b.serviceName),
  },
  {
    title: "Thời gian cấp",
    dataIndex: "startTime",
    key: "startTime",
    sorter: (a: DataItem, b: DataItem) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    sorter: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status),
  },
  {
    title: "Nguồn cấp",
    dataIndex: "source",
    key: "source",
    sorter: (a: DataItem, b: DataItem) => a.source.localeCompare(b.source),
  },
];

const pagination = {
  pageSize: 7,
};

function ReportPage() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const numberData = useSelector((state: RootState) => state.number.numbers);
  const deviceData = useSelector((state: RootState) => state.device.devices);

  const transformedServiceData: DataItem[] =
    numberData && deviceData
      ? numberData
          .map((number, index) => {
            const matchingDevice = deviceData.find((device) =>
              device.services.includes(number.serviceName)
            );
            const source = matchingDevice ? matchingDevice.deviceType : "";

            return {
              stt: 1,
              key: number.idNumber.toString(),
              customerName: number.customerName,
              serviceName: number.serviceName,
              startTime: number.issuanceDate,
              expirationDate: number.expirationDate,
              status: number.state,
              source: source,
            };
          })
          .filter((item) => {
            if (startDate && endDate) {
              const startDateObj = startDate.format("DD-MM-YYYY");
              const endDateObj = endDate.format("DD-MM-YYYY");
              const startTime = item.startTime.split(" ")[1];

              const startDateParse = moment(startDateObj, "D/M/YYYY");
              const endDateParse = moment(endDateObj, "D/M/YYYY");
              const dateToCheckk = moment(startTime, "D/M/YYYY");

              return dateToCheckk.isBetween(
                startDateParse,
                endDateParse,
                undefined,
                "[]"
              );
            }

            return true;
          })
      : [];

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const csvData = transformedServiceData.map((item) => ({
    STT: item.stt,
    "Tên dịch vụ": item.serviceName,
    "Thời gian cấp": item.startTime,
    "Tình trạng": item.status,
    "Nguồn cấp": item.source,
  }));

  return (
    <Layout>
      <Content style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            marginTop: "100px",
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
            <span>Trạng thái hoạt động:</span>
            <DatePicker onChange={handleStartDateChange} />
          </div>
          <div
            style={{
              marginRight: "16px",
              marginTop: "25px",
            }}
          >
            <DatePicker onChange={handleEndDateChange} />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={transformedServiceData}
          bordered
          style={{ width: "100%" }}
          pagination={pagination}
        />
      </Content>
      <CSVLink
        data={csvData}
        filename={"data.csv"}
        className="csv-download-link"
        target="_blank"
      >
        <Button
          icon={
            <DownloadOutlined
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
            style={{ fontSize: "12px", fontWeight: "700", color: "#FF7506" }}
          >
            Tải về
          </span>
        </Button>
      </CSVLink>
    </Layout>
  );
}

export default ReportPage;
