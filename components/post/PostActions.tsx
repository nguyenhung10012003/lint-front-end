"use client";
import { Icons } from "@/components/Icons";
import { api } from "@/config/api";
import { formatToShortNumber } from "@/utils/number";
import CommentModal from "./CommentModal";

export default function PostActions({
  likes,
  comments,
  liked,
  postId,
  mutate,
}: {
  likes: number;
  comments: number;
  liked: boolean;
  postId: string;
  mutate: () => void;
}) {
  const actionClasses =
    "flex gap-1 items-center cursor-pointer hover:scale-105 text-gray-700 dark:text-gray-300";
  const handleLike = async () => {
    if (liked) {
      await api.delete(`/like`, { data: { postId } });
      mutate();
    } else {
      await api.post(`/like`, { postId });
      mutate();
    }
  };
  return (
    <div className="flex gap-4">
      {/* like */}
      <div className={actionClasses} onClick={handleLike}>
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
        postId={postId}
      />

      {/* share */}
      <div className={actionClasses}>
        <Icons.share className={`w-6 h-6`} variant={"outline"} />
        <span className="text-sm font-semibold">{formatToShortNumber(0)}</span>
      </div>
    </div>
  );
}
