import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { getService } from "../../firebase/service/getService";
import { createService } from "../../firebase/service/createService";
import { updateService } from "../../firebase/service/updateService";
import {
  sendServiceStart,
  sendServiceSuccess,
  sendServiceFailure,
  updateServiceStart,
  updateServiceSuccess,
  updateServiceFailure,
  getServiceStart,
  getServiceSuccess,
  getServiceFailure,
} from "./serviceSlice";
import { Action } from "redux";

export const sendService =
  (
    autoIncreaseFrom: string | null,
    autoIncreaseTo: string | null,
    description: string,
    prefix: string | null,
    serviceCode: string,
    serviceName: string,
    suffix: string | null
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(sendServiceStart());
      await createService({
        autoIncreaseFrom,
        autoIncreaseTo,
        description,
        prefix,
        serviceCode,
        serviceName,
        suffix,
      });
      dispatch(sendServiceSuccess());
    } catch (error) {
      dispatch(sendServiceFailure("Lỗi khi tạo tài khoản"));
    }
  };

export const updateServiceThunk =
  (
    autoIncreaseFrom: string | null,
    autoIncreaseTo: string | null,
    description: string,
    prefix: string | null,
    serviceCode: string,
    serviceName: string,
    suffix: string | null
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(updateServiceStart());
      await updateService("serviceCode", serviceCode, {
        autoIncreaseFrom,
        autoIncreaseTo,
        description,
        prefix,
        serviceCode,
        serviceName,
        suffix,
      });
      dispatch(updateServiceSuccess());
    } catch (error) {
      dispatch(updateServiceFailure("Lỗi khi cập nhật số"));
    }
  };

export const fetchServiceThunk =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(getServiceStart());
      const services = await getService();
      dispatch(getServiceSuccess(services));
    } catch (error) {
      dispatch(getServiceFailure("Lỗi khi lấy danh sách số"));
    }
  };
