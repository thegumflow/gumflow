import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RootPage = () => {
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!role) {
      navigate("/login");
    } else if (role === "admin") {
      navigate("/admin/users-request");
    } else {
      navigate("/home");
    }
  }, [navigate, role]);
  return null;
};

export default RootPage;
