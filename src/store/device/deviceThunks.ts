import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { createDevice } from "../../firebase/device/createDevice";
import { getDevice } from "../../firebase/device/getDevice";
import {
  sendDeviceStart,
  sendDeviceSuccess,
  sendDeviceFailure,
  updateDeviceStart,
  updateDeviceSuccess,
  updateDeviceFailure,
  getDeviceStart,
  getDeviceSuccess,
  getDeviceFailure,
} from "./deviceSlice";
import { Action } from "redux";
import { updateDevice } from "../../firebase/device/updateDevice";

export const sendDevice =
  (
    deviceId: string,
    deviceName: string,
    deviceType: string,
    username: string,
    ipAddress: string,
    password: string,
    stateActive: string,
    stateConnect: string,
    services: string[]
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(sendDeviceStart());
      await createDevice({
        deviceId,
        deviceName,
        deviceType,
        username,
        ipAddress,
        password,
        stateActive,
        stateConnect,
        services,
      });
      dispatch(sendDeviceSuccess());
    } catch (error) {
      dispatch(sendDeviceFailure("Lỗi khi tạo tài khoản"));
    }
  };

export const updateDeviceThunk =
  (
    deviceId: string,
    deviceName: string,
    deviceType: string,
    username: string,
    ipAddress: string,
    password: string,
    services: string[]
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(updateDeviceStart());

      await updateDevice("deviceId", deviceId, {
        deviceName,
        deviceType,
        username,
        ipAddress,
        password,
        services,
      });

      dispatch(updateDeviceSuccess());
    } catch (error) {
      dispatch(updateDeviceFailure("Lỗi khi cập nhật tài khoản"));
    }
  };

export const fetchDeviceThunk =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(getDeviceStart());
      const devices = await getDevice();
      dispatch(getDeviceSuccess(devices));
    } catch (error) {
      dispatch(getDeviceFailure("Lỗi khi lấy danh sách tài khoản"));
    }
  };
