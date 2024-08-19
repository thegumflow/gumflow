import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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
    login: builder.mutation({
      query(body) {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        };
      },
    }),
    logout: builder.mutation({
      query() {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
    }),
    getUserInfo: builder.query({
      query() {
        return {
          url: `/auth/get-user`,
        };
      },
    }),

    updateUserProfile: builder.mutation({
      query(body) {
        return {
          url: `/auth/update-user-profile`,
          method: "PUT",
          body,
        };
      },
    }),

    updatePassword: builder.mutation({
      query(body) {
        return {
          url: `/auth/update-user-password`,
          method: "PUT",
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: `/auth/forgot-password`,
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/auth/password/reset/${token}`,
          method: "POST",
          body,
        };
      },
    }),
    isValidPasswordResetToken: builder.query({
      query({ token }) {
        return {
          url: `/auth/is-valid-reset-token/${token}`,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
  useUpdateUserProfileMutation,
  useUpdatePasswordMutation,
  useIsValidPasswordResetTokenQuery,
} = authApi;
