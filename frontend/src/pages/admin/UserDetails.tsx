import Loader from "@/components/layout/Loader";
import {
  useGetSingleUserQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/adminUserApi";
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

const UserDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleUserQuery(id);
  const user = data?.user;

  const [selectedStatus, setSelectedStatus] = useState("");

  const [updateUserStatus, { data: updatedResponse, isSuccess, isError }] =
    useUpdateUserStatusMutation();

  useEffect(() => {
    setSelectedStatus(user?.account_status);
  }, [data, user?.account_status]);

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
      <div className="m-auto flex justify-center items-center">
        <Loader color="#4b5563" />
      </div>
    );
  }
  return (
    <div className="pl-4 pr-4">
      <div className="bg-white overflow-hidden rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
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
              <dt className="text-sm font-medium text-gray-500">First name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.firstName}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.lastName}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Company name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.companyName}
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
              <dt className="text-sm font-medium text-gray-500">
                Account status
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.account_status === "pending" ? (
                  <div className="font-medium w-fit px-4 py-2 rounded-lg bg-red-200">
                    {user?.account_status}
                  </div>
                ) : null}
                {user?.account_status === "rejected" ? (
                  <div className="font-medium w-fit px-4 py-2 rounded-lg bg-orange-200">
                    {user?.account_status}
                  </div>
                ) : null}
                {user?.account_status === "approved" ? (
                  <div className="font-medium w-fit px-4 py-2 rounded-lg bg-green-200">
                    {user?.account_status}
                  </div>
                ) : null}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-2">
        <Select
          value={selectedStatus}
          onValueChange={(e) => {
            setSelectedStatus(e);
            updateUserStatus({ userId: id, status: e });
          }}
        >
          <SelectTrigger className="w-[180px] focus:ring-0 outline-none">
            <SelectValue placeholder="Change Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserDetails;
