"use client";
import { Icons } from "@/components/Icons";
import { formatToShortNumber } from "@/utils/number";
import CommentModal from "./CommentModal";

export default function PostActions({
  likes,
  comments,
  liked,
}: {
  likes: number;
  comments: number;
  liked: boolean;
}) {
  const actionClasses =
    "flex gap-1 items-center cursor-pointer hover:scale-105 text-gray-700 dark:text-gray-300";
  return (
    <div className="flex gap-4">
      {/* like */}
      <div className={actionClasses} onClick={() => {}}>
        <Icons.heart
          className={`w-6 h-6 ${liked && "text-red-500"}`}
          variant={liked ? "solid" : "outline"}
        />
        <span className="text-sm font-semibold">
          {formatToShortNumber(likes)}
        </span>
      </div>

      {/* comment */}
      <CommentModal
        trigger={
          <div className={actionClasses}>
            <Icons.message className={`w-6 h-6`} variant={"outline"} />
            <span className="text-sm font-semibold">
              {formatToShortNumber(comments)}
            </span>
          </div>
        }
      />

      {/* share */}
      <div className={actionClasses}>
        <Icons.share className={`w-6 h-6`} variant={"outline"} />
        <span className="text-sm font-semibold">{formatToShortNumber(0)}</span>
      </div>
    </div>
  );
}
