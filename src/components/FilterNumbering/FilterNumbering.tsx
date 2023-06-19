import { Select, DatePicker, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const { Option } = Select;

interface FilterProps {
  selectedService: string;
  selectedStatus: string;
  selectedSource: string;
  startDate: Moment | null;
  endDate: Moment | null;
  searchKeyword: string;
  handleServiceChange: (value: string) => void;
  handleStatusChange: (value: string) => void;
  handleSourceChange: (value: string) => void;
  handleStartDateChange: (value: Moment | null | any) => void;
  handleEndDateChange: (value: Moment | null | any) => void;
  handleSearchKeywordChange: (value: string) => void;
}

const FilterNumbering: React.FC<FilterProps> = ({
  selectedService,
  selectedStatus,
  selectedSource,
  startDate,
  endDate,
  searchKeyword,
  handleServiceChange,
  handleStatusChange,
  handleSourceChange,
  handleStartDateChange,
  handleEndDateChange,
  handleSearchKeywordChange,
}) => {
  const serviceData = useSelector((state: RootState) => state.service.services);
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
        <span>Tên dịch vụ</span>
        <Select
          style={{ width: "200px" }}
          value={selectedService}
          onChange={handleServiceChange}
        >
          <Option value="all">Tất cả</Option>
          {serviceData?.map((service) => (
            <Option key={service.serviceName}>{service.serviceName}</Option>
          ))}
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
        <span>Tình trạng</span>
        <Select
          style={{ width: "200px" }}
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <Option value="all">Tất cả</Option>
          <Option value="Đang chờ">Đang chờ</Option>
          <Option value="Đã sử dụng">Đã sử dụng</Option>
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
          style={{ width: "200px" }}
          value={selectedSource}
          onChange={handleSourceChange}
        >
          <Option value="all">Tất cả</Option>
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
        }}
      >
        <span>Chọn thời gian</span>
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
            <SearchOutlined style={{ color: "#FF7506", marginLeft: "auto" }} />
          }
          value={searchKeyword}
          onChange={(e) => handleSearchKeywordChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterNumbering;
