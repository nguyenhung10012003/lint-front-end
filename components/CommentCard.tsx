import { formatTimeDifference } from "@/utils/datetime";
import ProfileAvatar from "./ProfileAvatar";
import ProfileHoverCard from "./ProfileHoverCard";

export default function CommentCard({
  comment,
}: {
  comment: {
    id: string;
    content: string;
    createdAt: string;
    author: {
      id: string;
      alias: string;
      avatar: string;
      bio: string;
      name: string;
      gender: string;
      country: string;
    };
  };
}) {
  return (
    <div className="flex gap-2">
      <ProfileAvatar
        src={comment.author.avatar}
        alt={comment.author.alias}
        profileId={comment.author.id}
        variant="link"
      />
      <div className="">
        <div className="flex gap-2 items-center">
          <ProfileHoverCard profile={comment.author} />
          <span className="rounded-full inline-block h-[5px] w-[5px] bg-gray-400"></span>
          <span className="text-gray-400">
            {formatTimeDifference(new Date(comment.createdAt))}
          </span>
        </div>
        <div className="text-sm">{comment.content}</div>
      </div>
    </div>
  );
}
