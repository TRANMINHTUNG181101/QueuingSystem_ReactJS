import { Layout, Row, Col, Card, Select } from "antd";
import "./DashboardContent.css";
import { useState, useEffect } from "react";
const { Content } = Layout;
import CustomStatistic from "../CustomStatistic/CustomStatistic";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Progressbar from "../Progressbar/Progressbar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const { Option } = Select;

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
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { fetchNumberThunk } from "../../store/number/numberThunks";
import { fetchDeviceThunk } from "../../store/device/deviceThunks";
import { fetchServiceThunk } from "../../store/service/serviceThunks";

function DashboardContent() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  let currentPeriod;
  currentPeriod = `Tháng ${month}/${year}`;
  const options = useOptions();
  const [filter, setFilter] = useState("ngày");
  const [filterSub, setFilterSub] = useState<string>(currentPeriod);
  const [filteredNumbers, setFilteredNumbers] = useState<number[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [totalNumbers, setTotalNumbers] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalDevice, setTotalDevice] = useState(0);
  const [activeNumbersCount, setActiveNumbersCount] = useState(0);
  const [expiredNumbersCount, setExpiredNumbersCount] = useState(0);
  const [cancelledNumbersCount, setCancelledNumbersCount] = useState(0);

  const [activeDeviceCount, setActiveDeviceCount] = useState(0);
  const [inactiveDeviceCount, setInactiveDeviceCount] = useState(0);

  const [activeServiceCount, setActiveServiceCount] = useState(0);
  const [inactiveServiceCount, setInactiveServiceCount] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNumberThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });

    dispatch(fetchDeviceThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });

    dispatch(fetchServiceThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);

  const numberData = useSelector((state: RootState) => state.number.numbers);
  const serviceData = useSelector((state: RootState) => state.service.services);
  const deviceData = useSelector((state: RootState) => state.device.devices);

  useEffect(() => {
    const totalNumbers = numberData?.length;
    const totalService = serviceData?.length;
    const totalDevice = deviceData?.length;
    let activeNumbersCount = 0;
    let expiredNumbersCount = 0;
    let cancelledNumbersCount = 0;
    /*  */
    let activeDeviceCount = 0;
    let inactiveDeviceCount = 0;
    /*  */
    let activeServiceCount = 0;
    let inactiveServiceCount = 0;

    numberData.forEach((number) => {
      if (number.state === "Đã sử dụng") {
        activeNumbersCount++;
      } else if (number.state === "Đang chờ") {
        expiredNumbersCount++;
      } else if (number.state === "Bỏ qua") {
        cancelledNumbersCount++;
      }
    });

    deviceData.forEach((device) => {
      if (device.stateActive === "Hoạt động") {
        activeDeviceCount++;
      } else if (device.stateActive === "Ngưng hoạt động") {
        inactiveDeviceCount++;
      }
    });

    serviceData.forEach((service) => {
      const matchingNumber = numberData.find(
        (number) => number.serviceName === service.serviceName
      );
      if (matchingNumber) {
        activeServiceCount++;
      } else {
        inactiveServiceCount++;
      }
    });

    setTotalNumbers(totalNumbers);
    setTotalDevice(totalDevice);
    setTotalService(totalService);
    setActiveNumbersCount(activeNumbersCount);
    setExpiredNumbersCount(expiredNumbersCount);
    setCancelledNumbersCount(cancelledNumbersCount);
    /*  */
    setActiveDeviceCount(activeDeviceCount);
    setInactiveDeviceCount(inactiveDeviceCount);
    /*  */
    setActiveServiceCount(activeServiceCount);
    setInactiveServiceCount(inactiveServiceCount);

    filterNumbersByDate("ngày");
  }, [numberData, serviceData, deviceData]);

  const handleFilterChange = (value: any) => {
    const currentDate = new Date();
    setFilter(value);
    let currentPeriod;
    if (value === "ngày") {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      currentPeriod = `Tháng ${month}/${year}`;
    } else if (value === "tuần") {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      currentPeriod = `Tháng ${month}/${year}`;
    } else if (value === "tháng") {
      const year = currentDate.getFullYear();
      currentPeriod = `Năm ${year}`;
    }
    setFilterSub(currentPeriod || "");
    filterNumbersByDate(value);
  };

  const filterNumbersByDate = (filter: string) => {
    let filteredData: number[] = [];

    if (filter === "ngày") {
      for (let i = 1; i <= 31; i++) {
        const filteredCount = numberData.filter((number: any) => {
          const issuanceDate = number.issuanceDate;
          const timeAndDate = issuanceDate.split(" ");
          const date = timeAndDate[1];
          const day = date.split("/")[0];

          return day === i.toString();
        }).length;
        filteredData.push(filteredCount);
      }
    } else if (filter === "tuần") {
      for (let i = 1; i <= 4; i++) {
        const filteredCount = numberData.filter((number) => {
          const issuanceDate = number.issuanceDate;
          const timeAndDate = issuanceDate.split(" ");
          const date = timeAndDate[1];
          const day = Number(date.split("/")[0]);

          if (day <= 7 && i === 1) {
            return true;
          } else if (day > 7 && day <= 14 && i === 2) {
            return true;
          } else if (day > 14 && day <= 21 && i === 3) {
            return true;
          } else if (day > 21 && day <= 31 && i === 4) {
            return true;
          } else {
            return false;
          }
        }).length;
        filteredData.push(filteredCount);
      }
    } else if (filter === "tháng") {
      for (let i = 1; i <= 12; i++) {
        const filteredCount = numberData.filter((number) => {
          const issuanceDate = number.issuanceDate;
          const timeAndDate = issuanceDate.split(" ");
          const date = timeAndDate[1];
          const month = parseInt(date.split("/")[1], 10).toString();
          console.log(month);
          return month === i.toString();
        }).length;
        filteredData.push(filteredCount);
      }
    }

    console.log(filteredData);

    setFilteredNumbers(filteredData);
  };

  let labels: any = [];
  if (filter === "ngày") {
    labels = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ];
  } else if (filter === "tháng") {
    labels = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
  } else if (filter === "tuần") {
    labels = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: filteredNumbers,
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
          <Row gutter={20}>
            <Col span={17}>
              <div className="top-section">
                <h1 className="title">Biểu đồ cấp số</h1>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Card>
                      <CustomStatistic
                        title="Số thứ tự đã cấp"
                        value={totalNumbers}
                        smallValue="+10"
                        isIncreasing={true}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <CustomStatistic
                        title="Số thứ tự sử dụng"
                        value={activeNumbersCount}
                        smallValue="+10"
                        isIncreasing={true}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <CustomStatistic
                        title="Số thứ tự đang chờ"
                        value={expiredNumbersCount}
                        smallValue="+10"
                        isIncreasing={true}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <CustomStatistic
                        title="Số thứ tự đã bỏ qua"
                        value={cancelledNumbersCount}
                        smallValue="+10"
                        isIncreasing={true}
                      />
                    </Card>
                  </Col>
                </Row>
                <div className="chart-section" style={{ width: "100%" }}>
                  <div className="chart-section__filter">
                    <div className="chart-section__filter__title">
                      <h3>Bảng thồng kê theo {filter}</h3>
                      <span>{filterSub}</span>
                    </div>
                    <div className="chart-section__filter__select">
                      <Select
                        placeholder="Chọn vai trò"
                        onChange={handleFilterChange}
                        style={{ width: "100px" }}
                      >
                        <Option value="ngày">Ngày</Option>
                        <Option value="tuần">Tuần</Option>
                        <Option value="tháng">Tháng</Option>
                      </Select>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 370,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Line
                      options={options as ChartOptions<"line">}
                      data={data as ChartData<"line">}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={7}>
              <div className="bottom-section">
                <h1 className="title">Tổng quan</h1>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card>
                      <Progressbar
                        title="Số thứ tự đã sử dụng"
                        name="Thiết bị"
                        value={totalDevice}
                        smallValue="+10"
                        isIncreasing={true}
                        active={activeDeviceCount.toString()}
                        inactive={inactiveDeviceCount.toString()}
                      />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card>
                      <Progressbar
                        title="Số thứ tự đã sử dụng"
                        name="Dịch vụ"
                        value={totalService}
                        smallValue="+10"
                        isIncreasing={true}
                        active={activeServiceCount.toString()}
                        inactive={inactiveServiceCount.toString()}
                      />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card>
                      <Progressbar
                        title="Số thứ tự đã sử dụng"
                        name="Cấp số"
                        value={totalNumbers}
                        smallValue="+10"
                        isIncreasing={true}
                        active={activeNumbersCount.toString()}
                        inactive={expiredNumbersCount.toString()}
                        skip={cancelledNumbersCount.toString()}
                      />
                    </Card>
                  </Col>
                </Row>
                <div className="calendar-section">
                  <Calendar value={date} />
                </div>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardContent;
