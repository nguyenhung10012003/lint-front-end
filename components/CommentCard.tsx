import api from "@/config/api";
import { Comment, Reply } from "@/types/comment";
import { User } from "@/types/user";
import { formatTimeDifference } from "@/utils/datetime";
import { formatToShortNumber } from "@/utils/number";
import React, { useState } from "react";
import useSWR from "swr";
import CommentForm from "./CommentForm";
import { Icons } from "./Icons";
import ProfileAvatar from "./ProfileAvatar";
import ProfileHoverCard from "./ProfileHoverCard";
import { Skeleton } from "./ui/skeleton";

const fetcher = (url: string) => api.get<any, any>(url);

function CommentSkeleton() {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <Skeleton className="h-10 w-10 md:h-10 md:w-10 rounded-full" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-3 w-[100%]" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

function CommentUI({
  userId,
  content,
  createdAt,
  connector,
}: {
  userId: string;
  content: string;
  createdAt: string;
  connector?: React.ReactNode;
}) {
  const { data, error, isLoading } = useSWR<User>(`/user/${userId}`, fetcher);
  if (isLoading) return <CommentSkeleton />;
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <ProfileAvatar
          src={data?.profile.avatar}
          alt={data?.profile.alias}
          profileId={userId}
          variant="link"
          className="h-10 w-10 md:h-10 md:w-10"
        />
        {connector}
      </div>
      <div className="">
        <div className="flex gap-3 items-center">
          {data && <ProfileHoverCard user={data} />}
          <span className="text-gray-400 text-sm">
            {formatTimeDifference(new Date(createdAt))}
          </span>
        </div>
        <div className="text-sm">{content}</div>
        <div className="flex gap-4 mt-2">
          {/* like */}
          <div
            className="flex gap-1 items-center cursor-pointer hover:scale-105 text-gray-700 dark:text-gray-300"
            onClick={() => {}}
          >
            <Icons.heart
              className={`w-5 h-5 ${true && "text-red-500"}`}
              variant={true ? "solid" : "outline"}
            />
            <span className="text-sm font-semibold">
              {formatToShortNumber(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommentCard({ comment }: { comment: Comment }) {
  const { data, error, isLoading, mutate } = useSWR<{ replies: Reply[] }>(
    `/reply?commentId=${comment.id}&orderField=createdAt&orderDirection=desc`,
    fetcher
  );
  const [repliesShow, setRepliesShow] = useState(0);
  return (
    <div className="flex gap-2 px-4 flex-col">
      <CommentUI
        userId={comment.userId}
        content={comment.content}
        createdAt={comment.createdAt}
        connector={
          <div className="w-[3px] h-full bg-gray-500 mt-1 rounded-lg" />
        }
      />
      {data?.replies?.slice(0, repliesShow).map((reply: Reply) => (
        <CommentUI
          key={reply.id}
          userId={reply.userId}
          content={reply.content}
          createdAt={reply.createdAt}
          connector={
            <div className="w-[3px] h-full bg-gray-500 mt-1 rounded-lg" />
          }
        />
      ))}
      <div>
        {data?.replies && repliesShow < data?.replies?.length && (
          <button
            onClick={() => setRepliesShow(repliesShow + 2)}
            className="text-gray-400 text-sm"
          >
            View more replies
          </button>
        )}
        {data?.replies && repliesShow >= data?.replies?.length && (
          <button
            onClick={() => setRepliesShow(0)}
            className="text-gray-400 text-sm"
          >
            Hide replies
          </button>
        )}
      </div>
      <CommentForm
        postId={comment.postId}
        mutate={mutate}
        commentId={comment.id}
        submitAction="reply"
      />
    </div>
  );
}
