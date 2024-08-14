import { DataTable } from "@/components/layout/DataTable";
import { columns } from "./columns";
import { useLazyGetPendingUsersQuery } from "@/redux/api/adminUserApi";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const UsersRequestTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchPreview, setSearchPreview] = useState("");

  const [getPendingUsers, { data, status }] = useLazyGetPendingUsersQuery({});

  const debounced = useDebounceCallback(setSearchValue, 500);

  useEffect(() => {
    const obj = {
      currentPage: currentPage,
      searchValue,
    };
    getPendingUsers(obj);
  }, [searchValue, currentPage, getPendingUsers]);

  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className="text-xl border-b-2 w-fit pb-2 border-b-slate-400">
          User Request
        </h1>
        <div className="xl:w-[100%] w-full">
          <DataTable
            columns={columns}
            data={data?.users}
            total={data?.total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSearchValue={debounced}
            searchValue={searchValue}
            searchPreview={searchPreview}
            setSearchPreview={setSearchPreview}
            dataStatus={status}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersRequestTable;
