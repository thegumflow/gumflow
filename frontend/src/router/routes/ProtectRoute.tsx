import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  route: any;
  children: ReactNode;
}

const ProtectRoute = ({ route, children }: Props) => {
  const { role, userInfo } = useAppSelector((state) => state.auth);

  if (role) {
    if (route.role) {
      if (userInfo) {
        if (role === route.role) {
          if (route.status) {
            if (route.status === userInfo.account_status) {
              return <div>{children}</div>;
            } else {
              if (userInfo.account_status === "pending") {
                return <Navigate to="/account-pending" replace />;
              }
              if (userInfo.account_status === "rejected") {
                return <Navigate to="/account-rejected" replace />;
              } else {
                return <Navigate to="/home" />;
              }
            }
          } else {
            if (route.visibility) {
              if (
                route.visibility.some((r: any) => r === userInfo.account_status)
              ) {
                return <div>{children}</div>;
              } else {
                return <Navigate to="/account-pending" replace />;
              }
            } else {
              return <div>{children}</div>;
            }
          }
        } else {
          return <Navigate to="/unauthorized" replace />;
        }
      }
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;
