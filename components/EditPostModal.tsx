"use client";
import { Post, Tag } from "@/types/post";
import { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export default function EditPostModal({
  post,
  trigger,
}: {
  post: Post;
  trigger: React.ReactNode;
}) {
  const [content, setContent] = useState<string | undefined>(post.content);
  const [hashTags, setHashTags] = useState<Tag[] | undefined>(post.tags);
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit Post</DialogHeader>
        <div className="flex flex-col px-3 py-2 border rounded-xl focus:border-primary">
          <Textarea
            placeholder="What's on your mind?"
            className="resize-none p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-0 h-auto"
            rows={3}
            maxLength={500}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="w-full flex justify-end gap-2 items-center">
            <div className="w-full flex gap-1">
              {hashTags?.map((hashTag, index: number) => (
                <span
                  key={index}
                  className="text-primary text-sm hover:underline underline-offset-2 hover:cursor-pointer"
                >
                  {`#${hashTag.name}`}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {`${content?.length || 0}/500`}
            </span>
            <EmojiPicker
              text={""}
              setText={function (text: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
