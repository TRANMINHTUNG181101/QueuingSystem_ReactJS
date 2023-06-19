import React from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

interface AccountFilterProps {
  handleSearch: (value: string) => void;
  roleData: any[];
}

const FilterAccount: React.FC<AccountFilterProps> = ({
  handleSearch,
  roleData,
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
        <span>Tên vai trò:</span>
        <Select
          style={{ width: "200px" }}
          onChange={(value: string) => handleSearch(value)}
        >
          <Option value="all">Tất cả</Option>
          {roleData?.map((role) => (
            <Option key={role.roleName}>{role.roleName}</Option>
          ))}
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
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterAccount;
