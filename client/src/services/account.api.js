import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/account",
    credentials: "include",
  }),
  endpoints: (build) => ({
    createAccount: build.mutation({
      query: (body) => ({
        url: "/createAccount",
        method: "POST",
        body,
      }),
    }),
    getAccount: build.query({
      query: () => ({
        url: "/getAccount",
        method: "GET",
      }),
    }),
    profile: build.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useGetAccountQuery,
  useProfileQuery,
} = accountApi;
