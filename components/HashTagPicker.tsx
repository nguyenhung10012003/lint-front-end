"use client";

import useDebounce from "@/hooks/use-debounce";
import { createTag, getTags } from "@/lib/server-action/post-action";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

export default function HashTagPicker({
  trigger,
  triggerAsChild = false,
  onPick,
}: {
  onPick: (tag: string) => void;
  trigger: React.ReactNode | string;
  triggerAsChild?: boolean;
}) {
  const [keyword, setKeyword] = useState<string>("");
  const debounce = useDebounce(keyword, 500);
  const [hashtags, setHashtags] = useState<string[]>([]);
  useEffect(() => {
    getTags({ search: debounce, take: 10 }).then((res) => {
      res.tags
        ? setHashtags(res.tags.map((tag: any) => tag.name))
        : setHashtags([]);
    });
  }, [debounce]);

  const handleCreateTag = async () => {
    const tag = await createTag(keyword);
    onPick(tag.name);
  };
  return (
    <Popover>
      <PopoverTrigger asChild={triggerAsChild}>{trigger}</PopoverTrigger>
      <PopoverContent className="border rounded-lg min-w-[80px] max-w-[250px] min-h-[200px] bg-background flex flex-col w-full">
        <div className="pt-4 pb-0 flex gap-2 items-center border-b px-4 bg-background">
          <input
            className="bg-background inline-flex focus-visible:outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-background"
              onClick={() => setKeyword("")}
            >
              <Icons.close className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-col max-h-[200px] overflow-y-auto bg-background">
          {keyword && !hashtags.includes(keyword) && (
            <PopoverClose
              className="p-2 hover:bg-secondary hover:cursor-pointer border-b flex flex-col"
              onClick={handleCreateTag}
            >
              <p>{`#${keyword}`}</p>
              <p className="text-xs text-gray-500">Create new hashtag</p>
            </PopoverClose>
          )}
          {hashtags.map((tag) => (
            <PopoverClose
              key={tag}
              className="p-2 hover:bg-secondary hover:cursor-pointer border-b flex"
              onClick={() => onPick(tag)}
            >
              {`#${tag}`}
            </PopoverClose>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
