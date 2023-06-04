import { Row, Col, Typography } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
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
  return (
    <Row align="middle" gutter={8}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ArrowUpOutlined
          style={{
            fontSize: 16,
            backgroundColor: "#c6dacb",
            color: "#35C75A",
            padding: "10px",
            borderRadius: "50%",
          }}
        />
        <Typography.Text
          style={{ textAlign: "left", marginLeft: "10px" }}
          strong
        >
          {title}
        </Typography.Text>
      </div>
      <Col>
        <Typography.Text style={{ fontWeight: 700, fontSize: 25 }}>
          {value}
        </Typography.Text>
      </Col>
      <Col>
        <Typography.Text
          style={{
            background: "#E73F3F26",
            borderRadius: "10px",
            padding: "0px 10px",
            color: "#E73F3F",
            marginLeft: "50px",
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
