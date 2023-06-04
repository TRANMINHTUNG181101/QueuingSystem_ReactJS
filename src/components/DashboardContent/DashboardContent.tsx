import { Layout, Row, Col, Card } from "antd";
import { useState } from "react";
const { Content } = Layout;
import CustomStatistic from "../CustomStatistic/CustomStatistic";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Progressbar from "../Progressbar/Progressbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  ChartTypeRegistry,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
  ArcElement
);
export enum ChartTypeEnum {
  bar = "bar",
  line = "line",
  pie = "pie",
  doughnut = "doughnut",
}

import { useOptions } from "../../context/OptionDataContext";

function DashboardContent() {
  const options = useOptions();
  /* const data = useData(); */
  const [date, setDate] = useState<Date | null>(null);

  const randomData = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 100)
  );

  const data = {
    labels: [
      "Label 1",
      "Label 2",
      "Label 3",
      "Label 4",
      "Label 5",
      "Label 6",
      "Label 7",
      "Label 8",
      "Label 9",
      "Label 10",
    ],
    datasets: [
      {
        label: "test",
        data: randomData,
        fill: true,
        backgroundColor: "#CEDDFF",
        borderColor: "#5185F7",
        borderWidth: 2,
        lineTension: 0.3,
        legend: false,
      },
    ],
  };
  return (
    <Layout>
      <Layout>
        <Content className="dashboard-content">
          <div className="top-section">
            <h1 className="title">Biểu đồ cấp số</h1>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card>
                  <CustomStatistic
                    title="Số thứ tự đã sử dụng"
                    value={50}
                    smallValue="+10"
                    isIncreasing={true}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <CustomStatistic
                    title="Số thứ tự đã sử dụng"
                    value={50}
                    smallValue="+10"
                    isIncreasing={true}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <CustomStatistic
                    title="Số thứ tự đã sử dụng"
                    value={50}
                    smallValue="+10"
                    isIncreasing={true}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <CustomStatistic
                    title="Số thứ tự đã sử dụng"
                    value={50}
                    smallValue="+10"
                    isIncreasing={true}
                  />
                </Card>
              </Col>
            </Row>
            <div className="chart-section">
              <Line
                options={options as ChartOptions<"line">}
                data={data as ChartData<"line">}
              />
            </div>
          </div>
          <div className="bottom-section">
            <h1 className="title">Biểu đồ cấp số</h1>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card>
                  <Progressbar
                    title="Số thứ tự đã sử dụng"
                    value={50}
                    smallValue="+10"
                    isIncreasing={true}
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Card>
                  <Progressbar
                    title="Số thứ tự đã sử dụng"
                    value={50}
                    smallValue="+10"
                    isIncreasing={true}
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Card>
                  <Progressbar
                    title="Số thứ tự đã sử dụng"
                    value={50}
                    smallValue="+10"
                    isIncreasing={true}
                  />
                </Card>
              </Col>
            </Row>
            <div className="calendar-section">
              <Calendar value={date} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardContent;
