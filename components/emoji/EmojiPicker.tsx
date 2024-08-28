"use client";

import useDebounce from "@/hooks/use-debounce";
import emojiGroups from "@/utils/emojis.json";
import {capitalizeFirstLetter} from "@/utils/string";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {memo, useState} from "react";
import {Icons} from "../Icons";
import {Button} from "../ui/button";
import {Input} from "../ui/input";

const EmojiTable = memo(
  ({onChoose}: { onChoose: (emoji: string) => void }) => {
    const [key, setKey] = useState("");
    const debounce = useDebounce(key, 500);
    return (
      <div className="flex gap-2 flex-col max-w-[225px] max-h-[280px] items-center">
        <div className="px-2 w-full pt-2 pb-1">
          <div className="flex border rounded-full items-center w-full">
            <Icons.search className="w-6 h-6 p-1"/>
            <Input
              type="text"
              placeholder={""}
              className="border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto bg-transparent"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-y-auto p-2 flex flex-col gap-2">
          {emojiGroups.map((emojiGroup) => (
            <div key={emojiGroup.groupName}>
              <p className="text-md font-semibold">
                {capitalizeFirstLetter(emojiGroup.groupName)}
              </p>
              <div className="flex gap-1 flex-wrap">
                {emojiGroup.emojis
                  .filter((emoji) => emoji.unicodeName.includes(debounce))
                  .map((emoji) => (
                    <span
                      key={emoji.unicodeName}
                      className="text-2xl w-[30px] h-[30px] hover:cursor-pointer hover:bg-secondary rounded-md"
                      onClick={() => onChoose(emoji.character)}
                    >
                      {emoji.character}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
EmojiTable.displayName = "EmojiTable";

export default function EmojiPicker({
                                      text,
                                      setText,
                                    }: {
  text?: string;
  setText: (text: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto p-1 rounded-full" variant="ghost">
          <Icons.emoji className="h-5 w-5 hover:bg-ancent"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background border rounded-md z-60">
        <EmojiTable onChoose={setText}/>
      </PopoverContent>
    </Popover>
  );
}
