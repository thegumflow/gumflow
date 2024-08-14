import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hooks";
import { Outlet } from "react-router-dom";

interface Props {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContent = ({ showSidebar, setShowSidebar }: Props) => {
  // const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  const { userInfo, role } = useAppSelector((state) => state.auth);
  // const [logout, { isSuccess }] = useLogoutMutation();
  // const logoutUser = async () => {
  //   await logout({});
  //   localStorage.removeItem("accessToken");
  //   dispatch(userLogout());
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     userLogout();
  //     navigate("/login");
  //   }
  // }, [isSuccess, navigate]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 w-full px-2">
          <div className="flex items-center px-4">
            <button
              className="text-gray-500 focus:outline-none lg:hidden focus:text-gray-700"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {userInfo?.companyName && (
              <span className="mx-4 w-full border rounded-md px-4 py-2">
                {userInfo.companyName}
              </span>
            )}

            {role === "admin" && (
              <span className="mx-4 w-full border rounded-md px-4 py-2">
                Admin Dashboard
              </span>
            )}
          </div>
          <div className="flex items-center pr-4">
            {/* <DropdownMenu> */}
            {/* <DropdownMenuTrigger className="outline-0"> */}
            <Avatar className="border border-slate-200">
              <AvatarImage
                className="object-cover"
                src={
                  userInfo?.avatar
                    ? userInfo?.avatar
                    : role === "user"
                    ? "/images/user-profile2.jpg"
                    : "/brandLogo.png"
                }
              />
              <AvatarFallback>{userInfo?.firstName}</AvatarFallback>
            </Avatar>
            {/* </DropdownMenuTrigger> */}
            {/* <DropdownMenuContent className="mr-8">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
        <div className="pt-4">
          <div className="max-w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
