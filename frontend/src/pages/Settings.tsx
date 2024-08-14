import ChangePassword from "@/components/settings/ChangePassword";
import ProfileInfoChange from "@/components/settings/ProfileInfoChange";

const Settings = () => {
  return (
    <div className="pl-4 pr-4">
      <h1 className="text-xl mb-8 border-b-2 w-fit pb-2 border-b-slate-400">
        Settings
      </h1>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-1/2 w-full">
          <ProfileInfoChange />
        </div>
        <div className="md:w-1/2 w-full">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default Settings;
