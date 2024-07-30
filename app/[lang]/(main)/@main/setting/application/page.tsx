import { getDictionary } from "@/app/dictionaries";
import ApplicationSetting from "@/components/setting/ApplicationSetting";

export default async function Application({params} : {
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div className="flex flex-col w-full gap-4 max-w-[700px]">
      <ApplicationSetting dictionary={dictionary} />
    </div>
  );
}
