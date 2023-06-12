import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { createRole } from "../../firebase/role/createRole";
import { getRole } from "../../firebase/role/getRole";
import { updateRole } from "../../firebase/role/updateRole";
import {
  sendRoleStart,
  sendRoleSuccess,
  sendRoleFailure,
  updateRoleStart,
  updateRoleSuccess,
  updateRoleFailure,
  getRoleStart,
  getRoleSuccess,
  getRoleFailure,
} from "./roleSlice";
import { Action } from "redux";

export const creatRole =
  (
    idRole: string,
    roleName: string,
    description: string,
    permissions: {
      [functionGroup: string]: string[];
    }
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(sendRoleStart());
      await createRole({
        idRole,
        roleName,
        description,
        permissions,
      });
      dispatch(sendRoleSuccess());
    } catch (error) {
      dispatch(sendRoleFailure("Lỗi khi tạo tài khoản"));
    }
  };

export const updateRoleThunk =
  (
    idRole: string,
    roleName: string,
    description: string,
    permissions: {
      [functionGroup: string]: string[];
    }
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(updateRoleStart());
      await updateRole(idRole, {
        roleName,
        description,
        permissions,
      });
      dispatch(updateRoleSuccess());
    } catch (error) {
      dispatch(updateRoleFailure("Lỗi khi cập nhật số"));
    }
  };

export const fetchRoleThunk =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: any) => {
    try {
      dispatch(getRoleStart());
      const roles = await getRole();
      dispatch(getRoleSuccess(roles));
    } catch (error) {
      dispatch(getRoleFailure("Lỗi khi lấy danh sách số"));
    }
  };
