import {getDictionary} from "@/app/dictionaries";
import PostList from "@/components/post/PostList";

export default async function Home({
                                     params,
                                   }: {
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div className="flex flex-col gap-6 w-full py-6 px-4">
      <PostList dictionary={dictionary} url={{url: "/feed"}}/>
    </div>
  );
}
