"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

export default function EmojiPicker({
  text,
  setText,
}: {
  text: string;
  setText: (text: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto p-1 rounded-full" variant="ghost">
          <Icons.emoji className="h-5 w-5 hover:bg-ancent" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        {/*TODDO: Implement emoji picker here */}
      </PopoverContent>
    </Popover>
  );
}
