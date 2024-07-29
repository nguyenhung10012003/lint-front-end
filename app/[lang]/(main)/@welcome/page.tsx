import { getDictionary } from "@/app/dictionaries";
import ProfileSetupSteps from "@/components/ProfileSetupSteps";
import { getCookie } from "@/lib/server-action/cookies-action";
import { getOneUser } from "@/lib/server-action/user-action";

export default async function Welcome({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const { welcome } = await getDictionary(params.lang);
  const user = await getOneUser({
    id: (await getCookie("userId"))?.value || "",
  });

  return <ProfileSetupSteps profile={user.profile || {}} initStep={0} />;
}
