import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => {
    return {
      userLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "api/login",
            method: "POST",
            body: loginData,
          };
        },
      }),
      userRegister: builder.mutation({
        query: (data) => {
          return {
            url: "api/register",
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});
export const { useUserRegisterMutation, useUserLoginMutation } = authService;
export default authService;
