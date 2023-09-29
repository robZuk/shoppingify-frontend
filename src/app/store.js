import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import listReducer from "../slices/listSlice";
import { apiSlice } from "../slices/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    list: listReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
