import ProfileSetting from "@/components/setting/ProfileSetting";
import { getCookie } from "@/lib/server-action/cookies-action";
import { getOneUser } from "@/lib/server-action/user-action";

export default async function ProfileSettingPage() {
  const { profile } = await getOneUser({
    id: (await getCookie("userId"))?.value + "",
  });
  return (
    <div className="flex flex-col w-full gap-4 max-w-[700px]">
      <ProfileSetting profile={profile} />
    </div>
  );
}
