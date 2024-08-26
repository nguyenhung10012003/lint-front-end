import PrivacySetting from "@/components/setting/PrivacySetting";
import { getOneUser } from "@/lib/server-action/user-action";
import { getCookie } from "@/lib/server-action";
import { getDictionary } from "@/app/dictionaries";

export default async function Privacy({params} : {
  params: {
    lang: string;
  };
}) {
  const [user, dictionary] = await Promise.all([
    getOneUser({
      id: (await getCookie("userId"))?.value + "",
    }),
    getDictionary(params.lang),
  ]) 
  return (
    <div className="flex flex-col w-full gap-4 max-w-[700px]">
      <PrivacySetting isPrivate={user.setting.status === "PRIVATE"} dictionary={dictionary}/>
    </div>
  )
}