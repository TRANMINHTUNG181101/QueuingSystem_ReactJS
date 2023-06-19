import React from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

interface DeviceFilterProps {
  activeStatus: string | undefined;
  connectStatus: string | undefined;
  keyword: string | undefined;
  handleActiveStatusChange: (value: string) => void;
  handleConnectStatusChange: (value: string) => void;
  handleKeywordChange: (value: string) => void;
}

const FilterDevice: React.FC<DeviceFilterProps> = ({
  activeStatus,
  connectStatus,
  keyword,
  handleActiveStatusChange,
  handleConnectStatusChange,
  handleKeywordChange,
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
          onChange={handleActiveStatusChange}
          value={activeStatus}
        >
          <Option value="Hoạt động">Hoạt động</Option>
          <Option value="Ngưng hoạt động">Ngưng hoạt động</Option>
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
        <span>Trạng thái kết nối:</span>
        <Select
          style={{ width: "200px" }}
          onChange={handleConnectStatusChange}
          value={connectStatus}
        >
          <Option value="Kết nối">Kết nối</Option>
          <Option value="Mất kết nối">Mất kết nối</Option>
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
          value={keyword}
          onChange={(e) => handleKeywordChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterDevice;
