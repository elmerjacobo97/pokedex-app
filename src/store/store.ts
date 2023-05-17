import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {favoritesSlice} from './features/favorites';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {persistConfig} from './persistConfig';

const persistedReducer = persistReducer(persistConfig, favoritesSlice.reducer);

const store = configureStore({
  reducer: {
    favorites: persistedReducer,
  },
  // middleware: [],
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
