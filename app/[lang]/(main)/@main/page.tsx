import { getDictionary } from "@/app/dictionaries";
import PostList from "@/components/PostList";

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
      <PostList dictionary={dictionary} url={{ url: "/feed" }} />
    </div>
  );
}
