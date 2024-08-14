import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminUserApi = createApi({
  reducerPath: "adminUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gumflow.vercel.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Template"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query({ currentPage, searchValue }) {
        return {
          url: `/admin/get-all-users?currentPage=${currentPage}&searchValue=${searchValue}`,
        };
      },
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    getPendingUsers: builder.query({
      query({ currentPage, searchValue }) {
        return {
          url: `/admin/get-pending-users?currentPage=${currentPage}&searchValue=${searchValue}`,
        };
      },
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    getSingleUser: builder.query({
      query(userId) {
        return {
          url: `/admin/get-single-user/${userId}`,
        };
      },
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    updateUserStatus: builder.mutation({
      query({ userId, status }) {
        return {
          url: `/admin/update-user-status/${userId}`,
          method: "POST",
          body: { status },
        };
      },
      invalidatesTags: ["User"],
    }),

    getUsersFiles: builder.query({
      query({ currentPage, searchValue }) {
        return {
          url: `/admin/get-users-files?currentPage=${currentPage}&searchValue=${searchValue}`,
        };
      },
    }),
    uploadTemplate: builder.mutation({
      query(body) {
        return {
          url: `/admin/upload-template`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Template"],
    }),
    updateFileStatus: builder.mutation({
      query({ status, id }) {
        return {
          url: `/admin/update-file-status/${id}`,
          method: "PUT",
          body: {
            status,
          },
        };
      },
    }),
    getFileDetails: builder.query({
      query(id: string) {
        return {
          url: `/admin/file-details/${id}`,
        };
      },
    }),
    getAdminTemplates: builder.query({
      query() {
        return {
          url: `/admin/get-templates`,
        };
      },
      providesTags: ["Template"],
    }),
    deleteTemplates: builder.mutation({
      query({ templateId }) {
        return {
          url: `/admin/delete-template/${templateId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Template"],
    }),
  }),
});

export const {
  useLazyGetAllUsersQuery,
  useLazyGetPendingUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserStatusMutation,
  useLazyGetUsersFilesQuery,
  useUploadTemplateMutation,
  useUpdateFileStatusMutation,
  useGetFileDetailsQuery,
  useGetAdminTemplatesQuery,
  useDeleteTemplatesMutation,
} = adminUserApi;
