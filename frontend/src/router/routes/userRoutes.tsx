import Contact from "@/pages/Contact";
import Files from "@/pages/Files";
import Home from "@/pages/Home";
import Pending from "@/pages/Pending";
import Rejected from "@/pages/Rejected";
import Settings from "@/pages/Settings";
import Templates from "@/pages/Templates";

export const userRoutes = [
  {
    path: "account-pending",
    element: <Pending />,
    role: "user",
    status: "pending",
  },
  {
    path: "account-rejected",
    element: <Rejected />,
    role: "user",
    status: "rejected",
  },
  {
    path: "home",
    element: <Home />,
    role: "user",
    status: "approved",
  },
  {
    path: "contact",
    element: <Contact />,
    role: "user",
    status: "approved",
  },
  {
    path: "templates",
    element: <Templates />,
    role: "user",
    status: "approved",
  },
  {
    path: "files",
    element: <Files />,
    role: "user",
    status: "approved",
  },
  {
    path: "settings",
    element: <Settings />,
    role: "user",
    status: "approved",
  },
];
