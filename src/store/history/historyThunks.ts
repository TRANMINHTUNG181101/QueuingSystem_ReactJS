import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { createRole } from "../../firebase/role/createRole";
import { getHistory } from "../../firebase/history/getHistory";
import { createHistory } from "../../firebase/history/createHistory";
import {
  sendHistoryStart,
  sendHistorySuccess,
  sendHistoryFailure,
  getHistoryStart,
  getHistorySuccess,
  getHistoryFailure,
} from "./historySlice";
import { Action } from "redux";

export const createHistoryThunk =
  (
    username: string,
    timestamp: string,
    ipAddress: string,
    action: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(sendHistoryStart());
      await createHistory({
        username,
        timestamp,
        ipAddress,
        action,
      });
      dispatch(sendHistorySuccess());
    } catch (error) {
      dispatch(sendHistoryFailure("Lỗi khi tạo tài khoản"));
    }
  };

export const fetchHistoryThunk =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(getHistoryStart());
      const history = await getHistory();
      dispatch(getHistorySuccess(history));
    } catch (error) {
      dispatch(getHistoryFailure("Lỗi khi lấy danh sách số"));
    }
  };
