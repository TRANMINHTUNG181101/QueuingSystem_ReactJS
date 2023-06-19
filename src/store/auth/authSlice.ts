import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AccountInterface } from "../../interfaces/accountInterface";

interface AuthState {
  isAuthenticated: boolean;
  user: AccountInterface | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AccountInterface>) {
      console.log(action.payload);
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default persistReducer(
  {
    key: "auth",
    storage,
    whitelist: ["isAuthenticated", "user"],
  },
  authSlice.reducer
);

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;
