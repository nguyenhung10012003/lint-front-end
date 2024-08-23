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
    return (
      <div className="justify-center relative flex w-full">
        <SearchBox placeholder={dictionary.search.searchBox.placeholder} />
      </div>
    );
  return (
    <div className="flex items-center flex-col w-full gap-4 relative">
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
