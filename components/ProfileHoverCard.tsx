import { cn } from "@/lib/utils";

import { Profile } from "@/types/user";
import Link from "next/link";
import FollowBtn from "./FollowBtn";
import ProfileAvatar from "./ProfileAvatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Separator } from "./ui/separator";

export default function ProfileHoverCard({
  profile,
  avatarClassName,
  aliasClassName,
}: {
  profile: Profile;
  avatarClassName?: string;
  aliasClassName?: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          className={cn(
            "text-foreground hover:underline underline-offset-4 hover:cursor-pointer font-bold",
            aliasClassName
          )}
        >{`@${profile.alias}`}</span>
      </HoverCardTrigger>
      <HoverCardContent
        className="max-w-80 w-full flex flex-col p-6 border rounded-xl bg-background
        data-[side=bottom]:animate-slideUpAndFade data-[state=open]:transition-all
        data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade
        shadow-md flex-wrap text-wrap gap-6 z-60"
      >
        <Link
          className="flex flex-row gap-12 justify-between"
          href={`/profile/${profile.userId}`}
        >
          <div className="flex flex-col">
            <span className="font-semibold text-xl">{profile.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{`@${profile.alias}`}</span>
          </div>
          <ProfileAvatar
            src={profile.avatar}
            alt={profile.alias}
            userId={profile.id}
            className={cn("w-14 h-14 rounded-full", avatarClassName)}
          />
        </Link>
        <div className="text-sm">{profile.bio}</div>
        <div className="flex gap-2 text-gray-400">
          <span className="text-sm font-semibold">{0} followers</span>
          <Separator orientation="vertical" className="h-[20px]" />
          <span className="text-sm font-semibold">{0} following</span>
        </div>
        <FollowBtn followingId={profile.userId} />
      </HoverCardContent>
    </HoverCard>
  );
}
