import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['events', 'tickets', 'packages'],
};

export default persistConfig;