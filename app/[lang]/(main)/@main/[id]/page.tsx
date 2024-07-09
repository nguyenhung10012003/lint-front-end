import { FollowersModal, FollowingsModal } from "@/components/FollowModal";
import { Icons } from "@/components/Icons";
import PostCard from "@/components/post/PostCard";
import ProfileAvatar from "@/components/ProfileAvatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCookie } from "@/lib/actions";
import posts from "@/mocks/post.json";
import profiles from "@/mocks/profile.json";

export default async function Profile({
  params,
}: {
  params: {
    id: string;
    lang: string;
  };
}) {
  const profile = profiles[0];
  const isOwner = (await getCookie("user"))?.value === profile.id;
  return (
    <div className="flex flex-col w-full items-center max-w-[700px] mt-2 p-2 gap-4">
      <div className="flex gap-8 w-full justify-between md:gap-12 px-4">
        <div>
          <ProfileAvatar
            src={profile.avatar}
            alt={profile.name}
            variant="modal"
            className="w-20 h-20 md:w-28 md:h-28"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{profile.name}</h1>

            <div className="flex gap-4 items-center">
              {isOwner ? (
                <Button className="text-white min-w-[120px] hidden sm:flex">
                  Edit Profile
                </Button>
              ) : (
                <Button className="text-white min-w-[120px] hidden sm:flex h-8">
                  Follow
                </Button>
              )}
              <Icons.more className="w-8 h-8" />
            </div>
          </div>
          <p className="">{`@${profile.alias}`}</p>
          <div className="flex sm:gap-8 text-lg font-semibold gap-2 text-center py-4">
            <FollowersModal includeAction={isOwner} />
            <Separator
              className="h-full w-[2px] bg-gray-500 "
              orientation="vertical"
            />
            <FollowingsModal includeAction={isOwner} />
          </div>
          <p className="dark:text-gray-400 text-gray-500">{profile.bio}</p>
        </div>
      </div>
      {isOwner ? (
        <Button className="text-white min-w-[120px] sm:hidden w-full">
          Edit Profile
        </Button>
      ) : (
        <Button className="text-white min-w-[120px] w-full sm:hidden mt-4">
          Follow
        </Button>
      )}
      <Separator className="w-full h-[1px] bg-border" />
      <div className="flex flex-col gap-6 w-full items-center">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} lang={params.lang} />
        ))}
      </div>
    </div>
  );
}
