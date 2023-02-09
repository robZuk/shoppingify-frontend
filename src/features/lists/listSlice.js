import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import listService from "./listService";

const initialState = {
  lists: [],
  list: {
    id: "",
    name: "",
    products: [],
    status: "active",
  },
  listDetails: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user lists
export const getLists = createAsyncThunk(
  "lists/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getLists(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new ticket
export const createList = createAsyncThunk(
  "lists/add",
  async (listData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.createList(listData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Update list
export const updateList = createAsyncThunk(
  "list/update",
  async (list, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await listService.updateList(list, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user list
export const getList = createAsyncThunk(
  "list/get",
  async (listId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getList(listId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    reset: (state) => initialState,
    addProductToList: (state, action) => {
      state.list.products = [...state.list.products, action.payload];
    },
    removeProductFromList: (state, action) => {
      state.list.products = state.list.products.filter(
        (product) => product._id !== action.payload
      );
    },
    setQuantity: (state, action) => {
      const product = state.list.products.find(
        (item) => item._id === action.payload.id
      );

      product.quantity = action.payload.value;
    },
    editListName: (state, action) => {
      state.list.name = action.payload.name;
    },
    confirmProductToogle: (state, action) => {
      state.list.products.map((product) => {
        product._id === action.payload.product._id
          ? (product.confirmed = !product.confirmed)
          : product;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listDetails = action.payload;
      })
      .addCase(getList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = [...state.lists, action.payload];
        state.list = action.payload;
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const list = state.lists.find(
          (list) => list._id === action.payload._id
        );
        list.name = action.payload.name;
        list.products = action.payload.products;
        list.status = action.payload.status;
      })
      .addCase(updateList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  reset,
  addProductToList,
  removeProductFromList,
  setQuantity,
  editListName,
  confirmProductToogle,
} = listSlice.actions;
export default listSlice.reducer;
