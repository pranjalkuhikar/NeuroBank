import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.api";
import { accountApi } from "../services/account.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, accountApi.middleware),
});
