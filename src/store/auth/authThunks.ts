import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { login } from "../../firebase/auth/login";
import { persistor } from "../store";
import {
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "./authSlice";

import { Action } from "redux";

export const loginUser =
  (
    username: string,
    password: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const res = await login(username, password);
      console.log(res);
      if (res.length > 0) {
        const user = res[0];
        dispatch(loginSuccess(user));
      } else {
        dispatch(loginFailure("Đăng nhập thất bại"));
      }
    } catch (error) {
      dispatch(loginFailure("Đăng nhập thất bại"));
    }
  };
export const logout =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(logoutAction());
      await persistor.purge();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
