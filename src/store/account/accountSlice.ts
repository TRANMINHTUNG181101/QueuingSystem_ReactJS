import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountInterface } from "../../interfaces/accountInterface";

interface AccountState {
  isSending: boolean;
  error: string | null;
  accounts: AccountInterface[];
}

const initialState: AccountState = {
  isSending: false,
  error: null,
  accounts: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    sendAccountStart(state) {
      state.isSending = true;
      state.error = null;
    },
    sendAccountSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    sendAccountFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    updateAccountStart(state) {
      state.isSending = true;
      state.error = null;
    },
    updateAccountSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    updateAccountFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    getAccountsStart(state) {
      state.isSending = true;
      state.error = null;
      state.accounts = [];
    },
    getAccountsSuccess(state, action: PayloadAction<AccountInterface[]>) {
      state.isSending = false;
      state.error = null;
      state.accounts = action.payload;
    },
    getAccountsFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
    },
  },
});

export const { sendAccountStart, sendAccountSuccess, sendAccountFailure, updateAccountStart, updateAccountSuccess, updateAccountFailure, getAccountsStart, getAccountsSuccess, getAccountsFailure } =
  accountSlice.actions;

export default accountSlice.reducer;
