import storage from "redux-persist/lib/storage";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  cartReducer,
  userReducer,
  adminReducer,
  dataGlobalSlice,
  userCurrentInfo,
} from "./features";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";
import { update } from "lodash";

const persistCartConfig = {
  key: "cart",
  storage,
  whitelist: ["selectedShopIds"],
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistDataGlobal = {
  key: "dataGlobal",
  storage,
  // whiteList: []
};

const persistUserCurrentInfo = {
  key: "userCurrentInfo",
  storage,
  // whiteList: []
};

const peristCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistDataGlobalSetup = persistReducer(
  persistDataGlobal,
  dataGlobalSlice.reducer,
);
const persistUserCurrentSetup = persistReducer<TUser>(
  persistUserCurrentInfo,
  userCurrentInfo.reducer
)

export const rootReducer = combineReducers({
  cart: peristCartReducer,
  user: userReducer,
  admin: adminReducer,
  dataGlobal: persistDataGlobalSetup,
  userCurretnInfo: persistUserCurrentSetup
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      // 	ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      // },
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
