import { useEffect, useState } from "react";
import MainContent from "./MainContent";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useAppSelector } from "@/redux/hooks";
import { getNav } from "@/navigation";
import Logout from "./Logout";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const { role } = useAppSelector((state) => state.auth);

  const [allNav, setAllNav] = useState<any[]>([]);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  return (
    <div className="flex h-screen w-screen bg-slate-100 relative">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        {allNav.map((n, i) => (
          <SidebarItem
            key={i}
            icon={n.icon}
            text={n.title}
            to={n.path}
            active={pathname === n.path}
          />
        ))}

        <Logout />
      </Sidebar>

      <div
        className={`ml-0 lg:ml-[260px] transition-all w-full max-h-[100vh] overflow-y-auto`}
      >
        <MainContent
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
    </div>
  );
};

export default Layout;
