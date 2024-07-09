import ApplicationSetting from "@/components/setting/ApplicationSetting";
import PrivacySetting from "@/components/setting/PrivacySetting";
import ProfileSetting from "@/components/setting/ProfileSetting";

export default function Setting() {
  return (
    <div className="flex flex-col w-full gap-4 max-w-[700px]">
      <ProfileSetting />
      <PrivacySetting />
      <ApplicationSetting />
    </div>
  );
}
