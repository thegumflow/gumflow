import Loader from "@/components/layout/Loader";
import {
  useGetFileDetailsQuery,
  useUpdateFileStatusMutation,
} from "@/redux/api/adminUserApi";
import { Download } from "lucide-react";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const FileDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetFileDetailsQuery(id || "");

  const user = data?.file?.userId;
  const file = data?.file;

  const [selectedStatus, setSelectedStatus] = useState("");

  const [updateFileStatus, { isSuccess, data: updatedResponse, isError }] =
    useUpdateFileStatusMutation();

  useEffect(() => {
    setSelectedStatus(file?.file_status);
  }, [file]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: updatedResponse?.message,
        variant: "default",
      });
    }

    if (isError) {
      toast({
        title: updatedResponse?.message,
        variant: "destructive",
      });
    }
  }, [isSuccess, isError, updatedResponse?.message]);

  if (isLoading) {
    return (
      <div className="mt-10 flex w-full justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-col md:flex-row pl-4 pr-4">
      <div className="bg-white overflow-hidden shadow rounded-lg border box md:w-[40%] w-full">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Details
            </h3>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.fullName}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.phone}
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.companyName}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">User Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div
                  className={`font-medium w-fit px-4 py-2 rounded-lg
                  ${user?.account_status === "pending" ? "bg-red-200" : ""}
                  ${user?.account_status === "rejected" ? "bg-orange-200" : ""}
                  ${user?.account_status === "approved" ? "bg-green-200" : ""}
                  `}
                >
                  {user?.account_status}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg border box md:w-[60%] w-full">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              File Details
            </h3>
            <a href={file?.url}>
              <Download />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                File description
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {file?.description}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">File type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {file?.type}
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">File status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div
                  className={`font-medium w-fit px-4 py-2 rounded-lg
                  ${file?.file_status === "processing" ? "bg-red-200" : ""}
                   ${file?.file_status === "under_review" ? "bg-blue-200" : ""}
                  ${file?.file_status === "rejected" ? "bg-orange-200" : ""}
                  ${file?.file_status === "approved" ? "bg-green-200" : ""}
                  `}
                >
                  {file?.file_status === "under_review"
                    ? "under review"
                    : file?.file_status}
                </div>
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Uploded at</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {moment(file?.createdAt).format("LLL")}
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">
                Update file status
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Select
                  value={selectedStatus}
                  onValueChange={(e) => {
                    updateFileStatus({ id, status: e });
                    setSelectedStatus(e);
                    refetch();
                  }}
                >
                  <SelectTrigger className="w-[180px] focus:ring-0 outline-none">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="under_review">Under review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;
