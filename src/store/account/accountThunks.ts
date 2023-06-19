import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { createAccount } from "../../firebase/account/creatAccount";
import { updateAccount } from "../../firebase/account/updateAccount";
import { getAccount } from "../../firebase/account/getAccount";
import {
  sendAccountStart,
  sendAccountSuccess,
  sendAccountFailure,
  updateAccountStart,
  updateAccountSuccess,
  updateAccountFailure,
  getAccountsStart,
  getAccountsSuccess,
  getAccountsFailure,
} from "./accountSlice";
import { Action } from "redux";

export const creatAccount =
  (
    id: string,
    fullName: string,
    phoneNumber: string,
    email: string,
    role: string,
    username: string,
    password: string,
    status: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(sendAccountStart());
      await createAccount({
        id,
        fullName,
        phoneNumber,
        email,
        role,
        username,
        password,
        status,
      });
      dispatch(sendAccountSuccess());
    } catch (error) {
      dispatch(sendAccountFailure("Lỗi khi tạo tài khoản"));
    }
  };

export const updateAccountThunk =
  (
    id: string,
    fullName: string,
    phoneNumber: string,
    email: string,
    role: string,
    username: string,
    password: string,
    status: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(updateAccountStart());
      await updateAccount("id", id, {
        fullName,
        phoneNumber,
        email,
        role,
        username,
        password,
        status,
      });
      dispatch(updateAccountSuccess());
    } catch (error) {
      dispatch(updateAccountFailure("Lỗi khi cập nhật tài khoản"));
    }
  };

export const fetchAccountsThunk =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(getAccountsStart());
      const accounts = await getAccount();
      dispatch(getAccountsSuccess(accounts));
    } catch (error) {
      dispatch(getAccountsFailure("Lỗi khi lấy danh sách tài khoản"));
    }
  };
