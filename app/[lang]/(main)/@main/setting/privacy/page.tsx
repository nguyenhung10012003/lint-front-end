import { getDictionary } from "@/app/dictionaries";
import PrivacySetting from "@/components/setting/PrivacySetting";
import { getCookie } from "@/lib/server-action";
import { getOneUser } from "@/lib/server-action/user-action";

export default async function Privacy({
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
  return <PrivacySetting isPrivate={user.isPrivate} dictionary={dictionary} />;
}
