import { getDictionary } from "@/app/dictionaries";
import PostList from "@/components/PostList";
import UserSearchList from "@/components/UserSearchList";
import SearchBox from "./SearchBox";

export default async function Search({
  params,
  searchParams,
}: {
  params: {
    lang: string;
  };
  searchParams: {
    q: string;
    tags: string[];
  };
}) {
  const dictionary = await getDictionary(params.lang);

  if (!searchParams.q && !searchParams.tags)
    return <SearchBox placeholder={dictionary.search.searchBox.placeholder} />;
  return (
    <div className="flex items-center flex-col w-full p-4 gap-4 relative">
      <SearchBox placeholder={dictionary.search.searchBox.placeholder} />
      <UserSearchList q={searchParams.q} dictionary={dictionary} />
      <PostList
        dictionary={dictionary}
        url={{
          url: "/post/search",
          params: {
            key: searchParams.q,
            tags: searchParams.tags,
          },
        }}
      />
    </div>
  );
}
