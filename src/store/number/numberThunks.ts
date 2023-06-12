import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { createNumber } from '../../firebase/number/createNumber';
import { getNumber } from '../../firebase/number/getNumber';
import { sendNumberStart,
  sendNumberSuccess,
  sendNumberFailure,
  updateNumberStart,
  updateNumberSuccess,
  updateNumberFailure,
  getNumberStart,
  getNumberSuccess,
  getNumberFailure, } from './numberSlice';
import { Action } from 'redux';
import { updateNumber } from '../../firebase/number/updateNumber';

export const creatNumber = (
  idNumber : string,
  customerName: string,
  serviceName: string,
  issuanceDate: Date,
  expirationDate: Date,
  status: "Active" | "Expired" | "Cancelled",
  source: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch:any) => {
  try {
    dispatch(sendNumberStart());
    await createNumber({ 
    idNumber,
  customerName,
  serviceName,
  issuanceDate,
  expirationDate,
  status,
  source});
    dispatch(sendNumberSuccess());
  } catch (error) {
    dispatch(sendNumberFailure("Lỗi khi tạo tài khoản"));
  }
};

export const updateNumberThunk = (
    idNumber: string,
  customerName: string,
  serviceName: string,
  issuanceDate: Date,
  expirationDate: Date,
  status: "Active" | "Expired" | "Cancelled",
  source: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: any) => {
  try {
    dispatch(updateNumberStart());
    await updateNumber(idNumber, {
  customerName,
  serviceName,
  issuanceDate,
  expirationDate,
  status,
  source
    });
    dispatch(updateNumberSuccess());
  } catch (error) {
    dispatch(updateNumberFailure("Lỗi khi cập nhật số"));
  }
};

export const fetchNumberThunk = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: any) => {
  try {
    dispatch(getNumberStart());
    const devices = await getNumber();
    dispatch(getNumberSuccess(devices));
  } catch (error) {
    dispatch(getNumberFailure("Lỗi khi lấy danh sách số"));
  }
};