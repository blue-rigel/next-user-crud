import { User } from "@/util/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_URL }),
  tagTypes: ["Users", "SingleUser"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<{ data: User[], status: string}, void>({
      query: () => "api/user",
      providesTags: ["Users"]
    }),
    getSingleUser: builder.query({
      query: (id) => `api/user/${id}`,
      providesTags: ["SingleUser"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `/api/user`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/api/user/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users", "SingleUser"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation, useCreateUserMutation, useUpdateUserMutation, useGetSingleUserQuery } = userApi;
