import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import accountSlice from "./account/accountSlice";
import deviceSlice from "./device/deviceSlice";
import serviceSlice from "./service/serviceSlice";
import roleSlice from "./role/roleSlice";
import numberSlice from "./number/numberSlice";
import persistConfig from "./persistConfig";
import authSlice from "./auth/authSlice";
import historySlice from "./history/historySlice";
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({
  account: accountSlice,
  device: deviceSlice,
  service: serviceSlice,
  role: roleSlice,
  auth: authSlice,
  number: numberSlice,
  history: historySlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };

export default store;
