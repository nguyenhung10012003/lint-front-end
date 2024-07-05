"use client";
import { ChangeEvent, useRef, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import { Icons } from "./Icons";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CommentForm() {
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
  //console.log(isEmojiOpen);
  return (
    <div className="flex gap-2 w-full">
      <ProfileAvatar
        src={"d"}
        alt={"dd"}
        profileId={"1"}
        className="h-12 w-12"
      />
      <div
        className={`rounded-[25px] px-4 py-2 flex  w-full border justify-center ${
          isFocused ? "flex-col" : "flex-row items-center"
        }`}
        onFocus={() => setIsFocused(true)}
      >
        <Textarea
          className="border-none flex w-full p-0 focus-visible:ring-0 relative
          focus-visible:ring-offset-0 text-sm min-h-0 resize-none max-h-[60px]"
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
            <EmojiPicker text={comment} setText={setComment} />
          </div>
          <span className="text-sm text-gray-500 text-nowrap">
            {comment.length > 480 ? `${comment.length}/ 500` : ""}
          </span>
          <Button
            variant={"ghost"}
            className="p-2 rounded-full h-auto"
            disabled={!comment}
          >
            <Icons.send className={`w-5 h-5 text-blue-500`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
