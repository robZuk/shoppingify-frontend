import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  name: "",
  products: [],
  status: "active",
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setProductsFromList: (state, action) => {
      state.products = action.payload;
    },
    reset: (state) => initialState,
    setId: (state, action) => {
      state.id = action.payload;
    },
    addProductToList: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    removeProductFromList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    setQuantity: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload.id
      );

      product.quantity = action.payload.value;
    },
    editListName: (state, action) => {
      state.name = action.payload.name;
    },
    confirmProductToogle: (state, action) => {
      state.products.map((product) => {
        product._id === action.payload.product._id
          ? (product.confirmed = !product.confirmed)
          : product;
      });
    },
  },
});

export const {
  reset,
  setProductsFromList,
  setId,
  addProductToList,
  removeProductFromList,
  setQuantity,
  editListName,
  confirmProductToogle,
} = listSlice.actions;

export default listSlice.reducer;
