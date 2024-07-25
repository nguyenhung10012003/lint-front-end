import PostCard from "@/components/post/PostCard";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileHoverCard from "@/components/ProfileHoverCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import posts from "@/mocks/post.json";
import profiles from "@/mocks/profile.json";
import Link from "next/link";
import SearchBox from "./SearchBox";

export default function Search({
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
  return (
    <div className="flex items-center flex-col w-full p-4 gap-4 ">
      {/* <SearchBox placeholder="Search" />
      <Card className="w-full max-w-[550px] rounded-lg mt-5">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Peoples</CardTitle>
          <Link
            href={{ pathname: "/search/people", query: searchParams }}
            className="text-blue-500 hover:underline underline-offset-2"
          >
            See all
          </Link>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-4">
          {profiles.map((profile) => (
            <div className="flex gap-4" key={profile.id}>
              <ProfileAvatar
                src={profile.avatar}
                alt={profile.name}
                profileId={profile.id}
                variant="link"
                className="self-start w-10 h-10 md:w-10 md:h-10"
              />
              <div className={`flex w-full justify-between border-b-2 pb-1`}>
                <div>
                  <ProfileHoverCard profile={profile} />
                  <p className="font-light dark:text-gray-400 text-gray-500 text-md">
                    {profile.bio}
                  </p>
                  <div className="pt-2">0 follower</div>
                </div>
                <Button
                  variant={"outline"}
                  className="rounded-lg min-w-[100px]"
                >
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex flex-col gap-6 w-full items-center">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} lang={params.lang} />
        ))}
      </div> */}
    </div>
  );
}
