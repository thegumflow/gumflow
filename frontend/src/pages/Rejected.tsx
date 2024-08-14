import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Rejected = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.account_status === "approved") {
      navigate("/home");
    }
  });

  return (
    <div className="flex justify-center items-center h-full pl-4 pr-4">
      Account Status Rejected
    </div>
  );
};

export default Rejected;
