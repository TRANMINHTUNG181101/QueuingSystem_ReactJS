import { useState } from "react";
import { Layout, Input, Select, Table, DatePicker } from "antd";
import "./ManagerHistory.css";
import { SearchOutlined } from "@ant-design/icons";
import { fetchHistoryThunk } from "../../store/history/historyThunks";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment, { Moment } from "moment";

const { Content } = Layout;

const columns = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    sorter: false,
  },
  {
    title: "Thời gian tác động",
    dataIndex: "timestamp",
    key: "timestamp",
    sorter: false,
  },
  {
    title: "IP thực hiện",
    dataIndex: "ipAddress",
    key: "ipAddress",
    sorter: false,
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "action",
    key: "action",
    sorter: false,
  },
];

const pagination = {
  pageSize: 7,
};

function ManagerHistory() {
  const currentDate = moment();
  const [startDate, setStartDate] = useState<Moment | null>(
    moment().startOf("month")
  );
  const [endDate, setEndDate] = useState<Moment | null>(
    moment().endOf("month")
  );
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const dispatch = useDispatch();
  const historyData = useSelector((state: RootState) => state.history.historys);
  useEffect(() => {
    dispatch(fetchHistoryThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);

  const filteredData = historyData.filter((item) => {
    const startDateObj = startDate?.format("DD-MM-YYYY");
    const endDateObj = endDate?.format("DD-MM-YYYY");
    const startTime = item.timestamp.split(" ")[1];
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

    const isKeywordMatched =
      !searchKeyword ||
      item.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.ipAddress.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.action.toLowerCase().includes(searchKeyword.toLowerCase());

    return isDateMatched && isKeywordMatched;
  });

  const handleSearchKeywordChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };
  const handleStartDateChange = (value: any) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: any) => {
    setEndDate(value);
  };

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
              style={{ width: "200px" }}
              prefix={
                <SearchOutlined
                  style={{ color: "#FF7506", marginLeft: "auto" }}
                />
              }
              value={searchKeyword}
              onChange={handleSearchKeywordChange}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          bordered
          style={{ width: "100%" }}
          pagination={pagination}
        />
      </Content>
    </Layout>
  );
}

export default ManagerHistory;
