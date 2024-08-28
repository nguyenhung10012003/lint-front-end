"use client";
import { EmojiStyle } from "emoji-picker-react";
import dynamic from "next/dynamic";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
export default function Test() {
  return (
    <div>
      <EmojiPicker
        emojiStyle={EmojiStyle.FACEBOOK}
        skinTonesDisabled
        lazyLoadEmojis
        previewConfig={{
          showPreview: false,
        }}
      />
      <EmojiPicker
        reactionsDefaultOpen={true}
        onReactionClick={() => console.log("c")}
      />
    </div>
  );
}
