import React, { useState, useMemo } from "react";
import { Layout, Input, Select, Table, Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ServicePage.css";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchServiceThunk } from "../../store/service/serviceThunks";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import moment, { Moment } from "moment";
import FilterService from "../../components/FilterService/FilterService";

const { Content } = Layout;
const { Option } = Select;

const pagination = {
  pageSize: 7,
};

function ServicePage() {
  const dispatch = useDispatch();
  const serviceData = useSelector((state: RootState) => state.service.services);
  const numberData = useSelector((state: RootState) => state.number.numbers);

  const [activityStatus, setActivityStatus] = useState<string | undefined>(
    undefined
  );
  const [connectionStatus, setConnectionStatus] = useState<string | undefined>(
    undefined
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [startDate, setStartDate] = useState<Moment | null>(
    moment().startOf("month")
  );
  const [endDate, setEndDate] = useState<Moment | null>(
    moment().endOf("month")
  );

  useEffect(() => {
    dispatch(fetchServiceThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);

  const columns = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
      key: "serviceCode",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "activityStatus",
      key: "activityStatus",
      render: (text: any, record: any) => {
        const isActive = numberData.some(
          (number) => number.serviceName === record.serviceName
        );
        return isActive ? <span>Hoạt động</span> : <span>Ngừng hoạt động</span>;
      },
    },
    {
      title: " ",
      dataIndex: "detail",
      key: "detail",
      render: (text: any, record: any) => (
        <Link
          to="/dashboard/service/service-details"
          state={{ service: record }}
        >
          Chi tiết
        </Link>
      ),
    },
    {
      title: " ",
      dataIndex: "update",
      key: "update",
      render: (text: any, record: any) => (
        <Link to="/dashboard/service/edit-service" state={{ service: record }}>
          Cập nhật
        </Link>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    let filtered = serviceData;
    if (activityStatus) {
      filtered = filtered.filter((item) => {
        const isActive = numberData.find(
          (number) => number.serviceName === item.serviceName
        );
        return (
          (activityStatus === "active" && isActive) ||
          (activityStatus === "inactive" && !isActive)
        );
      });
    }
    if (searchKeyword) {
      filtered = filtered.filter((item) => {
        return (
          item.serviceCode.includes(searchKeyword) ||
          item.serviceName.includes(searchKeyword) ||
          item.description.includes(searchKeyword)
        );
      });
    }
    return filtered;
  }, [
    serviceData,
    numberData,
    activityStatus,
    connectionStatus,
    searchKeyword,
  ]);
  const handleActivityStatusChange = (value: string) => {
    setActivityStatus(value);
  };

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
  };

  return (
    <Layout>
      <Content style={{ padding: "16px" }}>
        <FilterService
          activityStatus={activityStatus}
          searchKeyword={searchKeyword}
          handleActivityStatusChange={handleActivityStatusChange}
          handleSearchKeywordChange={handleSearchKeywordChange}
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          bordered
          style={{ width: "100%" }}
          pagination={pagination}
        />
      </Content>
      <Button
        icon={
          <PlusOutlined
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#FF9138",
              color: "#FFF2E7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          />
        }
        style={{
          position: "absolute",
          right: "0px",
          top: "26%",
          width: "60px",
          height: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#FFF2E7 !important",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: "700", color: "#FF7506" }}>
          <Link
            to="/dashboard/service/add-service"
            style={{ color: "#FF7506" }}
          >
            Thêm <br />
            dịch vụ
          </Link>
        </span>
      </Button>
    </Layout>
  );
}

export default ServicePage;
