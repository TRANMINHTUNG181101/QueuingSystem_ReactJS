import { Row, Col, Typography } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Progressbar.css";

interface CustomStatisticProps {
  title: string;
  value: number;
  smallValue: string;
  isIncreasing: boolean;
}

const Progressbar: React.FC<CustomStatisticProps> = ({
  title,
  value,
  smallValue,
  isIncreasing,
}) => {
  return (
    <Row align="middle" gutter={8}>
      <div style={{ width: 50, height: 50 }}>
        <CircularProgressbar value={60} text={`${60}%`} />
      </div>
      <Col>
        <h3 className="progress-number">300</h3>
        <span className="progress-icon">thiết bị</span>
      </Col>
      <Col>
        <div className="progress-active">
          <span>Đang hoạt động</span>
          <h3>3.799</h3>
        </div>
        <div className="progress-active">
          <span>Đang hoạt động</span>
          <h3>3.799</h3>
        </div>
      </Col>
    </Row>
  );
};

export default Progressbar;
