import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useGetUserInfoQuery } from "./redux/api/authApi";
import { setUser } from "./redux/features/userSlice";
import { useAdminGetUserInfoQuery } from "./redux/api/adminAuthApi";
import Router from "./router/Router";
import { getRoutes } from "./router/routes";
import publicRoutes from "./router/routes/publicRoute";

const App = () => {
  const dispatch = useAppDispatch();
  const { token, role } = useAppSelector((state) => state.auth);

  const { data: userData } = useGetUserInfoQuery({ token }, { skip: !token });
  const { data: adminData } = useAdminGetUserInfoQuery(
    { token },
    { skip: !token }
  );

  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes((prevRoutes) => [...prevRoutes, { ...routes }]);
  }, []);

  useEffect(() => {
    const handleUserInfo = (data: any) => {
      if (data && data.userInfo) {
        dispatch(setUser(data.userInfo));
      }
    };

    if (role === "user") {
      handleUserInfo(userData);
    } else if (role === "admin") {
      handleUserInfo(adminData);
    }
  }, [token, role, userData, adminData, dispatch]);

  return <Router allRoutes={allRoutes} />;
};

export default App;
