import React from "react";
import { Input, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";

interface HistoryFilterProps {
  startDate: Moment | null | any;
  endDate: Moment | null | any;
  searchKeyword: string;
  handleSearchKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartDateChange: (value: Moment | null | any) => void;
  handleEndDateChange: (value: Moment | null | any) => void;
}

const FilterHistory: React.FC<HistoryFilterProps> = ({
  startDate,
  endDate,
  searchKeyword,
  handleSearchKeywordChange,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  return (
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
        <DatePicker onChange={handleStartDateChange} value={startDate} />
      </div>
      <div
        style={{
          marginRight: "16px",
          marginTop: "25px",
        }}
      >
        <DatePicker onChange={handleEndDateChange} value={endDate} />
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
            <SearchOutlined style={{ color: "#FF7506", marginLeft: "auto" }} />
          }
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
        />
      </div>
    </div>
  );
};

export default FilterHistory;
