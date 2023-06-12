import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice';
import persistConfig from './persistConfig';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  account : accountSlice
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
