import { useLazyGetMyFilesQuery } from "@/redux/api/userApi";
import Loader from "../layout/Loader";
import { DataTable } from "../layout/DataTable";
import { columns } from "./UserFilesTableCoulmn";
import { useEffect, useState } from "react";

const UserFiles = () => {
  const [getMyFiles, { data, isLoading, status }] = useLazyGetMyFilesQuery();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const obj = {
      currentPage: currentPage,
    };
    getMyFiles(obj);
  }, [currentPage, getMyFiles]);

  if (!data) {
    return (
      <div className="mt-10 flex w-full justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-md mt-8 bg-white w-full p-4 border-b-slate-400 rounded-sm">
        Uploded files
      </h2>
      {isLoading ? (
        <div className="mt-10 flex w-full justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <div className="bg-white mt-4 rounded-sm">
            <DataTable
              columns={columns}
              data={data?.myFiles}
              total={data?.total}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              dataStatus={status}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFiles;
