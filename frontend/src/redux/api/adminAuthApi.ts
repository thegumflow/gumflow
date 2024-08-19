import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gumflow-api.vercel.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query(body) {
        return {
          url: "/admin/auth/login",
          method: "POST",
          body,
        };
      },
    }),
    adminForgotPassword: builder.mutation({
      query(body) {
        return {
          url: "/admin/auth/password/forgot",
          method: "POST",
          body,
        };
      },
    }),
    adminResetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/admin/auth/password/reset/${token}`,
          method: "PUT",
          body,
        };
      },
    }),
    adminGetUserInfo: builder.query({
      query() {
        return {
          url: `/admin/auth/get-user`,
        };
      },
    }),
  }),
});

export const {
  useAdminForgotPasswordMutation,
  useAdminGetUserInfoQuery,
  useAdminLoginMutation,
  useAdminResetPasswordMutation,
} = adminAuthApi;
