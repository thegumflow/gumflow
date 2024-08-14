import { DataTable } from "@/components/layout/DataTable";
import { columns } from "./columns";
import { useLazyGetAllUsersQuery } from "@/redux/api/adminUserApi";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const AllUserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchPreview, setSearchPreview] = useState("");

  const [getAllUsers, { isLoading, data, status }] = useLazyGetAllUsersQuery();

  const debounced = useDebounceCallback(setSearchValue, 500);

  useEffect(() => {
    const obj = {
      currentPage: currentPage,
      searchValue,
    };
    getAllUsers(obj);
  }, [searchValue, currentPage, getAllUsers]);

  return (
    <div className={`w-full ${isLoading ? "overflow-hidden" : ""}`}>
      <div className="w-full">
        <h1 className="text-xl border-b-2 w-fit pb-2 border-b-slate-400">
          All User
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
            showTotal={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AllUserTable;
