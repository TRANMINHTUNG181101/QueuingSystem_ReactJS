import React, { useState } from "react";
import { Layout, Input, Select, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ManagerRole.css";
import { SearchOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchRoleThunk } from "../../store/role/roleThunks";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { RoleInterface } from "../../interfaces/roleInterface";

const { Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Tên vai trò",
    dataIndex: "roleName",
    key: "roleName",
    sorter: false,
  },
  {
    title: "Số người dùng",
    dataIndex: "userCount",
    key: "userCount",
    sorter: false,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    sorter: false,
  },
  {
    title: " ",
    dataIndex: "update",
    key: "update",
    sorter: false,
    render: (text: any, record: any) => (
      <Link to="/dashboard/manager-role/edit-role" state={{ role: record }}>
        Cập nhật
      </Link>
    ),
  },
];

const pagination = {
  pageSize: 7,
};

function ManagerRole() {
  const dispatch = useDispatch();
  const roleData = useSelector((state: RootState) => state.role.roles);
  const accountData = useSelector((state: RootState) => state.account.accounts);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState<RoleInterface[]>([]);

  const transformedRoleData: any = roleData.map((role, index) => {
    const matchingAccounts = accountData.filter((account) =>
      account.role.includes(role.roleName)
    );
    const matchingAccountCount = matchingAccounts.length;
    return {
      roleName: role.roleName,
      userCount: matchingAccountCount,
      description: role.description,
    };
  });

  useEffect(() => {
    dispatch(fetchRoleThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);

  useEffect(() => {
    const filteredRoles = roleData.filter((role) => {
      return (
        role.roleName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        role.description.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });

    setFilteredData(filteredRoles);
  }, [roleData, searchKeyword]);

  const handleSearch = (value: any) => {
    setSearchKeyword(value);
  };

  return (
    <Layout>
      <Content style={{ padding: "16px" }}>
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
                <SearchOutlined
                  style={{ color: "#FF7506", marginLeft: "auto" }}
                />
              }
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={transformedRoleData}
          bordered
          style={{ width: "100%" }}
          pagination={pagination}
        />
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
          <span
            style={{ fontSize: "12px", fontWeight: "700", color: "#FF7506" }}
          >
            <Link
              to="/dashboard/manager-role/add-role"
              style={{ color: "#FF7506" }}
            >
              Thêm
              <br /> vai trò
            </Link>
          </span>
        </Button>
      </Content>
    </Layout>
  );
}

export default ManagerRole;
