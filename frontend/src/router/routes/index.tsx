import { privateRoutes } from "./privateRoute";
import ProtectRoute from "./ProtectRoute";
import Layout from "@/components/layout/Layout";

export const getRoutes = () => {
  privateRoutes.map((r: any) => {
    r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
  });

  return {
    path: "/",
    element: <Layout />,
    children: privateRoutes,
  };
};
