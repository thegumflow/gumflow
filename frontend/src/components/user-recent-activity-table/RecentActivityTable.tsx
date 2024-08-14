import { DataTable } from "@/components/layout/DataTable";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { useLazyGetRecentActivitesQuery } from "@/redux/api/userApi";

const RecentActivityTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [getRecentActivites, { isLoading, data, status }] =
    useLazyGetRecentActivitesQuery();

  console.log(status);

  useEffect(() => {
    const obj = {
      currentPage: currentPage,
    };
    getRecentActivites(obj);
  }, [currentPage, getRecentActivites]);

  return (
    <div className={`w-full ${isLoading ? "overflow-hidden" : ""}`}>
      <div className="w-full">
        <h1 className="text-xl mb-8 border-b-2 w-fit pb-2 border-b-slate-400">
          Recent Activity
        </h1>
        <div className="xl:w-[60%] w-full mb-4">
          <DataTable
            columns={columns}
            data={data?.recentActivities}
            total={data?.total}
            showTotal={false}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            dataStatus={status}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTable;
