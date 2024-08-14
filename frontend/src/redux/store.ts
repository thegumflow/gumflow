import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { authApi } from "./api/authApi";
import { adminAuthApi } from "./api/adminAuthApi";
import { adminUserApi } from "./api/adminUserApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [adminUserApi.reducerPath]: adminUserApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      adminAuthApi.middleware,
      adminUserApi.middleware,
      userApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
