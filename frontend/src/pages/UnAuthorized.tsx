import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin/users-request");
    }
  }, [navigate, role]);

  return (
    <div className="pl-4 pr-4">
      <h1>Unauthorized Page</h1>
    </div>
  );
};

export default UnAuthorized;
