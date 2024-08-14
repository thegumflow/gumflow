import { DataTable } from "@/components/layout/DataTable";
import { columns } from "./columns";
import { useLazyGetUsersFilesQuery } from "@/redux/api/adminUserApi";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const UserFilesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchPreview, setSearchPreview] = useState("");

  const [getUsersFiles, { data, status }] = useLazyGetUsersFilesQuery();

  const debounced = useDebounceCallback(setSearchValue, 500);

  useEffect(() => {
    const obj = {
      currentPage: currentPage,
      searchValue,
    };
    getUsersFiles(obj);
  }, [searchValue, currentPage, getUsersFiles]);

  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className="text-xl border-b-2 w-fit pb-2 border-b-slate-400">
          Users Files
        </h1>
        <div className="xl:w-[100%] w-full">
          <DataTable
            columns={columns}
            data={data?.files}
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

export default UserFilesTable;
