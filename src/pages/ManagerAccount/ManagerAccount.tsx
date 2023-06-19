import React, { useState } from "react";
import { Layout, Input, Select, Table, Button } from "antd";
import "./ManagerAccount.css";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountsThunk } from "../../store/account/accountThunks";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { AccountInterface } from "../../interfaces/accountInterface";
import FilterAccount from "../../components/FilterAccount/FilterAccount";

const { Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    sorter: false,
  },
  {
    title: "Họ tên",
    dataIndex: "fullName",
    key: "fullName",
    sorter: false,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    sorter: false,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: false,
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    sorter: false,
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "status",
    key: "status",
    sorter: false,
  },
  {
    title: " ",
    dataIndex: "update",
    key: "update",
    sorter: false,
    render: (text: any, record: any) => (
      <Link
        to="/dashboard/manager-account/edit-account"
        state={{ account: record }}
      >
        Cập nhật
      </Link>
    ),
  },
];

const pagination = {
  pageSize: 7,
};

function ManagerAccount() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState<AccountInterface[]>([]);
  const dispatch = useDispatch();
  const accountData = useSelector((state: RootState) => state.account.accounts);
  const roleData = useSelector((state: RootState) => state.role.roles);

  useEffect(() => {
    dispatch(fetchAccountsThunk() as unknown as AnyAction)
      .then(() => {
        console.log("Gửi thành công");
      })
      .catch(() => {
        console.log("Lỗi");
      });
  }, []);

  const handleSearch = (value: any) => {
    setSearchKeyword(value);
  };

  useEffect(() => {
    const filteredAccounts = accountData.filter((account) => {
      return (
        account.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        account.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        account.phoneNumber
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        account.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        account.role.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        account.status.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });

    if (searchKeyword == "all") {
      setFilteredData(accountData);
    } else {
      setFilteredData(filteredAccounts);
    }

    setFilteredData(filteredAccounts);
  }, [accountData, searchKeyword]);
  return (
    <Layout>
      <Content style={{ padding: "16px" }}>
        <FilterAccount handleSearch={handleSearch} roleData={roleData} />
        <Table
          columns={columns}
          dataSource={filteredData}
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
              to="/dashboard/manager-account/add-account"
              style={{ color: "#FF7506" }}
            >
              Thêm
              <br /> tài khoản
            </Link>
          </span>
        </Button>
      </Content>
    </Layout>
  );
}

export default ManagerAccount;
