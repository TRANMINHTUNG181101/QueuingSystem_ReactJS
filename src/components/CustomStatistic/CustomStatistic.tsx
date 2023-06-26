import { Row, Col, Typography } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  HourglassOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./CustomStatistic.css";

interface CustomStatisticProps {
  title: string;
  value: number;
  smallValue: string;
  isIncreasing: boolean;
}

const CustomStatistic: React.FC<CustomStatisticProps> = ({
  title,
  value,
  smallValue,
  isIncreasing,
}) => {
  let icon;
  let bgColor;
  let color;
  switch (title) {
    case "Số thứ tự đã cấp":
      icon = <ArrowUpOutlined />;
      bgColor = "#E8EFFE";
      color = "#6493F9";
      break;
    case "Số thứ tự sử dụng":
      icon = <HourglassOutlined />;
      bgColor = "#E1F7E6";
      color = "#35C75A";
      break;
    case "Số thứ tự đang chờ":
      icon = <ArrowDownOutlined />;
      bgColor = "#FFF3E9";
      color = "#FFAC6A";
      break;
    case "Số thứ tự đã bỏ qua":
      icon = <CloseOutlined />;
      bgColor = "#FEE9E9";
      color = "#F86D6D";
      break;
    default:
      icon = null;
  }
  return (
    <Row align="middle" gutter={8}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {icon && (
          <span
            style={{
              fontSize: 16,
              backgroundColor: bgColor,
              color: color,
              padding: "10px",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </span>
        )}
        <Typography.Text
          style={{
            textAlign: "left",
            marginLeft: "10px",
          }}
          strong
        >
          {title}
        </Typography.Text>
      </div>
      <Col>
        <Typography.Text
          style={{ fontWeight: 700, fontSize: 25, paddingRight: "10px" }}
        >
          {value}
        </Typography.Text>
      </Col>
      <Col style={{ marginLeft: "auto" }}>
        <Typography.Text
          style={{
            background: "#E73F3F26",
            borderRadius: "10px",
            padding: "0px 10px",
            color: "#E73F3F",
            marginLeft: "auto",
          }}
          type={isIncreasing ? "success" : "danger"}
        >
          {smallValue}
        </Typography.Text>
      </Col>
    </Row>
  );
};

export default CustomStatistic;
