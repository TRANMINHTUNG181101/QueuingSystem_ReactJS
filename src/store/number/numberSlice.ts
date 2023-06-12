import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberingInterface } from "../../interfaces/numberInterface";

interface NumberState {
  isSending: boolean;
  error: string | null;
  numbers: NumberingInterface[];
}

const initialState: NumberState = {
  isSending: false,
  error: null,
  numbers: [],
};

const numberSlice = createSlice({
  name: "number",
  initialState,
  reducers: {
    sendNumberStart(state) {
      state.isSending = true;
      state.error = null;
    },
    sendNumberSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    sendNumberFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    updateNumberStart(state) {
      state.isSending = true;
      state.error = null;
    },
    updateNumberSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    updateNumberFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    getNumberStart(state) {
      state.isSending = true;
      state.error = null;
      state.numbers = [];
    },
    getNumberSuccess(state, action: PayloadAction<NumberingInterface[]>) {
      state.isSending = false;
      state.error = null;
      state.numbers = action.payload;
    },
    getNumberFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
    },
  },
});

export const {
  sendNumberStart,
  sendNumberSuccess,
  sendNumberFailure,
  updateNumberStart,
  updateNumberSuccess,
  updateNumberFailure,
  getNumberStart,
  getNumberSuccess,
  getNumberFailure,
} = numberSlice.actions;

export default numberSlice.reducer;
