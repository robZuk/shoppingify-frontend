import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/categories/categorySlice";
import productReducer from "../features/products/productSlice";
import listReducer from "../features/lists/listSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    lists: listReducer,
  },
});
