import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceInterface } from "../../interfaces/serviceInterface";

interface ServiceState {
  isSending: boolean;
  error: string | null;
  services: ServiceInterface[];
}

const initialState: ServiceState = {
  isSending: false,
  error: null,
  services: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    sendServiceStart(state) {
      state.isSending = true;
      state.error = null;
    },
    sendServiceSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    sendServiceFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    updateServiceStart(state) {
      state.isSending = true;
      state.error = null;
    },
    updateServiceSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    updateServiceFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    getServiceStart(state) {
      state.isSending = true;
      state.error = null;
      state.services = [];
    },
    getServiceSuccess(state, action: PayloadAction<ServiceInterface[]>) {
      state.isSending = false;
      state.error = null;
      state.services = action.payload;
    },
    getServiceFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
    },
  },
});

export const {
  sendServiceStart,
  sendServiceSuccess,
  sendServiceFailure,
  updateServiceStart,
  updateServiceSuccess,
  updateServiceFailure,
  getServiceStart,
  getServiceSuccess,
  getServiceFailure,
} = serviceSlice.actions;

export default serviceSlice.reducer;
