import { Row, Col, Typography } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Progressbar.css";

interface CustomStatisticProps {
  title: string;
  name: string;
  value: number;
  smallValue: string;
  isIncreasing: boolean;
  active: string;
  inactive: string;
  skip?: string;
}

const Progressbar: React.FC<CustomStatisticProps> = ({
  title,
  name,
  value,
  smallValue,
  isIncreasing,
  active,
  inactive,
  skip,
}) => {
  let progressColor = "";
  switch (name) {
    case "Thiết bị":
      progressColor = "#FF7506";
      break;
    case "Dịch vụ":
      progressColor = "#4277FF";
      break;
    default:
      progressColor = "#35C75A";
      break;
  }

  const progressStyles = buildStyles({
    pathColor: progressColor,
    textColor: progressColor,
  });

  let percent = Math.round((Number(active) / Number(value)) * 100);
  return (
    <Row align="middle" gutter={8}>
      <div style={{ width: 50, height: 50 }}>
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          styles={progressStyles}
        />
      </div>
      <Col>
        <h3 className="progress-number">{value}</h3>
        <span className="progress-icon">{name}</span>
      </Col>
      <Col>
        {name === "Cấp số" ? (
          <>
            <div className="progress-active">
              <span>Đã sử dụng</span>
              <h3>{active}</h3>
            </div>
            <div className="progress-active">
              <span>Đang chờ</span>
              <h3>{inactive}</h3>
            </div>
            <div className="progress-active">
              <span>Bỏ qua</span>
              <h3>{skip}</h3>
            </div>
          </>
        ) : (
          <>
            <div className="progress-active">
              <span>Đang hoạt động</span>
              <h3>{active}</h3>
            </div>
            <div className="progress-active">
              <span>Ngưng hoạt động</span>
              <h3>{inactive}</h3>
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Progressbar;
