import { getDictionary } from "@/app/dictionaries";
import ApplicationSetting from "@/components/setting/ApplicationSetting";

export default async function Application({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  return <ApplicationSetting dictionary={dictionary} />;
}
