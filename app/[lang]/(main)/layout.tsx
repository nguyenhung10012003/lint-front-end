import DefaultLayout from "@/components/layouts/DefaultLayout";
import { getCookie } from "@/lib/server-action/cookies-action";
import { getOneUser } from "@/lib/server-action/user-action";
import { ReactNode } from "react";
import { SocketProvider } from "@/components/providers/SocketProvider";

export default async function Main({
  main,
  welcome,
  params,
}: {
  main: ReactNode;
  welcome: ReactNode;
  params: {
    lang: string;
  };
}) {
  const user = await getOneUser({
    id: (await getCookie("userId"))?.value || "",
  });
  const needProfile = user.profile.name && user.profile.alias;
  if (needProfile)
    return (
      <SocketProvider>
        <DefaultLayout user={user} lang={params.lang}>
          {main}
        </DefaultLayout>
      </SocketProvider>
    );
  else return <>{welcome}</>;
}
