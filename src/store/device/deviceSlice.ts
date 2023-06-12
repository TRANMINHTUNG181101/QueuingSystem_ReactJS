import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceInterface } from "../../interfaces/deviceInterface";

interface DeviceState {
  isSending: boolean; 
  error: string | null;
  devices: DeviceInterface[];
}

const initialState: DeviceState = {
  isSending: false,
  error: null,
  devices: [],
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    sendDeviceStart(state) {
      state.isSending = true;
      state.error = null;
    },
    sendDeviceSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    sendDeviceFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    updateDeviceStart(state) {
      state.isSending = true;
      state.error = null;
    },
    updateDeviceSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    updateDeviceFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    getDeviceStart(state) {
      state.isSending = true;
      state.error = null;
      state.devices = [];
    },
    getDeviceSuccess(state, action: PayloadAction<DeviceInterface[]>) {
      state.isSending = false;
      state.error = null;
      state.devices = action.payload;
    },
    getDeviceFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
    },
  },
});

export const { sendDeviceStart, sendDeviceSuccess, sendDeviceFailure, updateDeviceStart, updateDeviceSuccess, updateDeviceFailure, getDeviceStart, getDeviceSuccess, getDeviceFailure } =
  deviceSlice.actions;

export default deviceSlice.reducer;
