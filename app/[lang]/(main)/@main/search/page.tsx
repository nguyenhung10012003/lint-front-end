import { getDictionary } from "@/app/dictionaries";
import PostList from "@/components/PostList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserList from "@/components/UserList";
import { api } from "@/config/api";
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
  const [users, dictionary] = await Promise.all([
    api.get<any, any>(`/user/search?key=${searchParams.q}`),
    getDictionary(params.lang),
  ]);
  if (!searchParams.q && !searchParams.tags)
    return <SearchBox placeholder={dictionary.search.searchBox.placeholder} />;
  return (
    <div className="flex items-center flex-col w-full p-4 gap-4 ">
      <SearchBox placeholder={dictionary.search.searchBox.placeholder} />
      {users?.usersId && (
        <Card className="w-full max-w-[550px] rounded-lg mt-5">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>{dictionary.search.searchResult.people}</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col gap-4 max-h-[300px] overflow-y-auto py-1">
            <UserList usersId={users.usersId} />
          </CardContent>
        </Card>
      )}
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
