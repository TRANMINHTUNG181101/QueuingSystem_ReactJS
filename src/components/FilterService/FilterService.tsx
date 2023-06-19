import React from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Moment } from "moment";

const { Option } = Select;

interface ServiceFilterProps {
  activityStatus: string | undefined;
  searchKeyword: string;
  handleActivityStatusChange: (value: string) => void;
  handleSearchKeywordChange: (value: string) => void;
}

const FilterService: React.FC<ServiceFilterProps> = ({
  activityStatus,
  searchKeyword,
  handleActivityStatusChange,
  handleSearchKeywordChange,
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
        <Select
          style={{ width: "200px" }}
          onChange={handleActivityStatusChange}
          value={activityStatus}
        >
          <Option value="active">Hoạt động</Option>
          <Option value="inactive">Ngưng hoạt động</Option>
        </Select>
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
          onChange={(e) => handleSearchKeywordChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterService;
