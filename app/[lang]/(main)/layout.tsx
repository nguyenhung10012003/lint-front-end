import DefaultLayout from "@/components/layouts/DefaultLayout";
import { ReactNode } from "react";

export default function Main({
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
  const user = true;
  if (user) return <DefaultLayout lang={params.lang}>{main}</DefaultLayout>;
  else return <>{welcome}</>;
}
