import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const { token } = useAppSelector((state) => state.auth);
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Protected;
