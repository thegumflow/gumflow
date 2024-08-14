import { Button } from "@/components/custom/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Edit, Edit3, Loader } from "lucide-react";
import ChangeDetails from "./ChangeDetails";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { useUpdateUserProfileMutation } from "@/redux/api/authApi";
import { uploadFilesToFirebaseAndGetUrl } from "@/utils/file-upload";
import { toast } from "../ui/use-toast";
import { setUser } from "@/redux/features/userSlice";
const ProfileInfoChange = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const dispatch = useAppDispatch();

  const uploadAvatar = async (e: any) => {
    if (!e.target.files?.[0]) {
      return;
    }
    setFileUploadLoading(true);
    try {
      const url = await uploadFilesToFirebaseAndGetUrl(
        e.target.files?.[0],
        "avatar"
      );

      const body = { avatar: url };

      const data = await updateUserProfile(body).unwrap();

      dispatch(setUser(data?.userInfo));

      toast({
        title: data?.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "avatar upload failed",
        description: error.data.error,
        variant: "destructive",
      });
    } finally {
      setFileUploadLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Details
        </h3>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"}>
                <Edit3 size={18} className="mr-4" /> Change Details
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0">
              <ChangeDetails />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
            <dt className="text-sm font-medium text-gray-500">Profile image</dt>
            <div className="relative flex justify-center items-center">
              {fileUploadLoading || isLoading ? (
                <div className="h-[70px] w-[70px] rounded-full border flex justify-center items-center">
                  <Loader className="animate-spin w-8 h-8" />
                </div>
              ) : (
                <>
                  <Avatar className="h-[70px] w-[70px] border">
                    <AvatarImage
                      className="object-cover"
                      src={
                        userInfo?.avatar
                          ? userInfo?.avatar
                          : "/images/user-profile2.jpg"
                      }
                    />
                    <AvatarFallback>{userInfo?.firstName}</AvatarFallback>
                  </Avatar>

                  <div className="absolute right-12 bottom-2">
                    <label htmlFor="avatar" className="cursor-pointer">
                      <Edit size={20} color="black" className="bg-white" />
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id="avatar"
                      onChange={(e) => uploadAvatar(e)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.fullName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">First name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.firstName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Last name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.lastName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Company name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.companyName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.email}
            </dd>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.phone}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Account status
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="font-medium w-fit px-4 py-2 rounded-lg bg-green-200">
                Approved
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProfileInfoChange;
