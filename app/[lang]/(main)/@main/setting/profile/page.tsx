import { getDictionary } from "@/app/dictionaries";
import ProfileSetting from "@/components/setting/ProfileSetting";
import { getCookie } from "@/lib/server-action/cookies-action";
import { getOneUser } from "@/lib/server-action/user-action";

export default async function ProfileSettingPage({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const [user, dictionary] = await Promise.all([
    getOneUser({
      id: (await getCookie("userId"))?.value + "",
    }),
    getDictionary(params.lang),
  ]);
  return <ProfileSetting profile={user.profile} dictionary={dictionary} />;
}
