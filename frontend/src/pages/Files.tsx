import UserFileUpload from "@/components/files/UserFileUpload";
import UserFiles from "@/components/files/UserFilesTable";

const Files = () => {
  return (
    <div className="pl-4 pr-4 w-full">
      <div className="w-full">
        <h1 className="text-xl border-b-2 w-fit pb-2 border-b-slate-400">
          File
        </h1>
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="sm:w-[50%] w-full">
            <div className="bg-white mt-8 rounded-sm">
              <UserFileUpload />
            </div>
          </div>
          <div className="sm:w-[50%] w-full">
            <div>
              <UserFiles />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
