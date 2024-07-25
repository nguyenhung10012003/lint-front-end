import { getDictionary } from "@/app/dictionaries";
import Feed from "@/components/Feed";

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div className="flex flex-col gap-6 w-full">
      <Feed dictionary={dictionary} />
    </div>
  );
}
