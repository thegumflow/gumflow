import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["File"],
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
    getRecentActivites: builder.query({
      query({ currentPage }) {
        return {
          url: `/user/recent-activity?currentPage=${currentPage}`,
        };
      },
    }),
    fileUpload: builder.mutation({
      query(body) {
        return {
          url: `/user/file-upload`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["File"],
    }),
    getTemplates: builder.query({
      query() {
        return {
          url: `/user/get-templates`,
        };
      },
    }),
    getMyFiles: builder.query({
      query({ currentPage }) {
        return {
          url: `/user/get-my-files?currentPage=${currentPage}`,
        };
      },
      providesTags: ["File"],
    }),
    emailSendToAdmin: builder.mutation({
      query(body) {
        return {
          url: `/user/email-to-admin`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useLazyGetRecentActivitesQuery,
  useFileUploadMutation,
  useGetTemplatesQuery,
  useLazyGetMyFilesQuery,
  useEmailSendToAdminMutation,
} = userApi;
