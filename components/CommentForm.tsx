"use client";
import { api } from "@/config/api";
import { cn } from "@/lib/utils";
import { Comment, Reply } from "@/types/comment";
import { useCookies } from "next-client-cookies";
import { ChangeEvent, useRef, useState } from "react";
import useSWR from "swr";
import EmojiPicker from "./EmojiPicker";
import { Icons } from "./Icons";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const fetcher = (url: string) => api.get<any, any>(url);
export default function CommentForm({
  postId,
  mutate,
  commentBoxClassName,
  submitAction,
  commentId,
}: {
  postId: string;
  commentId?: string;
  mutate?: (newComment: any) => void;
  submitAction?: "comment" | "reply";
  commentBoxClassName?: string;
}) {
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = (): void => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async () => {
    if (submitAction === "reply") {
      const newReply = await api.post<any, Reply>(`/reply`, {
        content: comment,
        commentId: commentId,
      });
      mutate && mutate(newReply);
      setComment("");
      return;
    }
    if (submitAction === "comment") {
      const newComment = await api.post<any, Comment>(`/comment`, {
        postId: postId,
        content: comment,
      });
      mutate && mutate(newComment);
      setComment("");
      return;
    }
  };
  const cookies = useCookies();
  const { data, error, isLoading } = useSWR(
    `/user/${cookies.get("userId")}`,
    fetcher
  );
  if (isLoading) return <div></div>;
  return (
    <div className="flex gap-2 w-full">
      <ProfileAvatar
        src={data.profile.avatar}
        alt={data.profile.name}
        userId={data.id}
        className="h-10 md:h-10 w-10 md:w-10"
      />
      <div
        className={`rounded-[20px] px-4 py-1 flex  w-full border justify-center ${
          isFocused ? "flex-col" : "flex-row items-center"
        }`}
        onFocus={() => setIsFocused(true)}
      >
        <Textarea
          className={cn(
            "border-none flex w-full p-0 focus-visible:ring-0 relative focus-visible:ring-offset-0 text-sm min-h-0 resize-none max-h-[60px]",
            commentBoxClassName
          )}
          placeholder="Type your comment here"
          value={comment}
          ref={textareaRef}
          onChange={(e) => handleComment(e)}
          maxLength={500}
          rows={1}
          autoFocus={false}
        />
        <div className={`flex items-center`}>
          <div className={`flex ${isFocused ? "w-full" : ""}`}>
            <EmojiPicker
              text={comment}
              setText={(text) => setComment(comment + text)}
            />
          </div>
          <span className="text-sm text-gray-500 text-nowrap">
            {comment.length > 480 ? `${comment.length}/ 500` : ""}
          </span>
          <Button
            variant={"ghost"}
            className="p-1 rounded-full h-auto"
            disabled={!comment}
            onClick={handleSubmit}
          >
            <Icons.send className={`w-5 h-5 text-blue-500`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
