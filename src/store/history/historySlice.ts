import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryInterface } from "../../interfaces/historyInterface";

interface HisoryState {
  isSending: boolean;
  error: string | null;
  historys: HistoryInterface[];
}

const initialState: HisoryState = {
  isSending: false,
  error: null,
  historys: [],
};

const historySlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    sendHistoryStart(state) {
      state.isSending = true;
      state.error = null;
    },
    sendHistorySuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    sendHistoryFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
    },
    getHistoryStart(state) {
      state.isSending = true;
      state.error = null;
      state.historys = [];
    },
    getHistorySuccess(state, action: PayloadAction<HistoryInterface[]>) {
      state.isSending = false;
      state.error = null;
      state.historys = action.payload;
    },
    getHistoryFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
    },
  },
});

export const {
  sendHistoryStart,
  sendHistorySuccess,
  sendHistoryFailure,
  getHistoryStart,
  getHistorySuccess,
  getHistoryFailure,
} = historySlice.actions;

export default historySlice.reducer;
