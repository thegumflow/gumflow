import AllUser from "@/pages/admin/AllUser";
import FileDetails from "@/pages/admin/FileDetails";
import UploadTemplate from "@/pages/admin/UploadTemplate";
import UserDetails from "@/pages/admin/UserDetails";
import UserRequest from "@/pages/admin/UserRequest";
import UsersFiles from "@/pages/admin/UsersFiles";

export const adminRoutes = [
  {
    path: "admin/users-request",
    element: <UserRequest />,
    role: "admin",
  },
  {
    path: "admin/all-users",
    element: <AllUser />,
    role: "admin",
  },
  {
    path: "admin/user-details/:id",
    element: <UserDetails />,
    role: "admin",
  },
  {
    path: "admin/users-files",
    element: <UsersFiles />,
    role: "admin",
  },
  {
    path: "admin/upload-templates",
    element: <UploadTemplate />,
    role: "admin",
  },
  {
    path: "admin/file/:id",
    element: <FileDetails />,
    role: "admin",
  },
];
