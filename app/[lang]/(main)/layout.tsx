import DefaultLayout from "@/components/layouts/DefaultLayout";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { api} from "@/config/api";
import { getCookie } from "@/lib/server-action/cookies-action";
import { User } from "@/types/user";
import { ReactNode } from "react";

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
  const user = await api.get<any, User>(
    `/user/${(await getCookie("userId"))?.value}`
  );

  const needProfile = user.profile && user.profile.name && user.profile.alias;
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
