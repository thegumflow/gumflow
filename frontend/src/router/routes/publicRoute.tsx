import NotFoundError from "@/pages/NotFoundError";
import RootPage from "@/pages/RootPage";
import UnAuthorized from "@/pages/UnAuthorized";
import AdminLogin from "@/pages/admin/AdminLogin";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";

const publicRoutes = [
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
  {
    path: "/password/reset/:token",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFoundError />,
  },
];

export default publicRoutes;
