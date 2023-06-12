import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleInterface } from "../../interfaces/roleInterface";

interface RoleState {
  isSending: boolean;
  error: string | null;
  roles: RoleInterface[];
}

const initialState: RoleState = {
  isSending: false,
  error: null,
  roles: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    sendRoleStart(state) {
      state.isSending = true;
      state.error = null;
    },
    sendRoleSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    sendRoleFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    updateRoleStart(state) {
      state.isSending = true;
      state.error = null;
    },
    updateRoleSuccess(state) {
      state.isSending = false;
      state.error = null;
    },
    updateRoleFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    getRoleStart(state) {
      state.isSending = true;
      state.error = null;
      state.roles = [];
    },
    getRoleSuccess(state, action: PayloadAction<RoleInterface[]>) {
      state.isSending = false;
      state.error = null;
      state.roles = action.payload;
    },
    getRoleFailure(state, action: PayloadAction<string>) {
      state.isSending = false;
      state.error = action.payload;
    },
  },
});

export const {
  sendRoleStart,
  sendRoleSuccess,
  sendRoleFailure,
  updateRoleStart,
  updateRoleSuccess,
  updateRoleFailure,
  getRoleStart,
  getRoleSuccess,
  getRoleFailure,
} = roleSlice.actions;

export default roleSlice.reducer;
