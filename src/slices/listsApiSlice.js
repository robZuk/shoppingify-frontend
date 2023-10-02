import { LISTS_URL } from "../constans";
import { apiSlice } from "./apiSlice";

export const listsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => ({
        url: LISTS_URL,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Lists"],
    }),

    getList: builder.query({
      query: (listId) => ({
        url: `${LISTS_URL}/${listId}`,
      }),
      providesTags: ["Lists"],
      keepUnusedDataFor: 0,
    }),

    updateList: builder.mutation({
      query: (data) => ({
        url: `${LISTS_URL}/${data?.listId}`,
        method: "PUT",
        body: data,
      }),
      keepUnusedDataFor: 0,
      invalidatesTags: ["Lists"],
    }),

    createList: builder.mutation({
      query: (data) => ({
        url: LISTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lists"],
    }),
  }),
});

export const {
  useGetListsQuery,
  useGetListQuery,
  useUpdateListMutation,
  useCreateListMutation,
} = listsApiSlice;
