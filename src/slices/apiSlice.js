import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_BASE_URL;
const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Category", "Product", "List"],
  endpoints: (builder) => ({}),
});
