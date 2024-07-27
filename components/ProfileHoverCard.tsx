import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Link from "next/link";
import FollowBtn from "./FollowBtn";
import ProfileAvatar from "./ProfileAvatar";
import { Separator } from "./ui/separator";

export default function ProfileHoverCard({
  user,
  avatarClassName,
  aliasClassName,
}: {
  user: User;
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
        >{`@${user.profile.alias}`}</span>
      </HoverCardTrigger>
      <HoverCardContent
        className="max-w-80 w-full flex flex-col p-6 border rounded-xl bg-background
        data-[side=bottom]:animate-slideUpAndFade data-[state=open]:transition-all
        data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade
        shadow-md flex-wrap text-wrap gap-6 z-60"
      >
        <Link
          className="flex flex-row gap-12 justify-between"
          href={`/profile/${user.id}`}
        >
          <div className="flex flex-col">
            <span className="font-semibold text-xl">{user.profile.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{`@${user.profile.alias}`}</span>
          </div>
          <ProfileAvatar
            src={user.profile.avatar}
            alt={user.profile.alias}
            profileId={user.id}
            className={cn("w-14 h-14 rounded-full", avatarClassName)}
          />
        </Link>
        <div className="text-sm">{user.profile.bio}</div>
        <div className="flex gap-2 text-gray-400">
          <span className="text-sm font-semibold">{0} followers</span>
          <Separator orientation="vertical" className="h-[20px]" />
          <span className="text-sm font-semibold">{0} following</span>
        </div>
        <FollowBtn followingId={user.id} />
        <HoverCardArrow className="fill-background" />
      </HoverCardContent>
    </HoverCard>
  );
}
