"use client";

import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { extractHashtags } from "@/utils/hashtag";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox({ placeholder }: { placeholder: string }) {
  const [key, setKey] = useState<undefined | string>();
  const search = useDebounce(key, 700);
  const router = useRouter();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && key) {
      const { text, hashtags } = extractHashtags(key);
      const tagsQuery = hashtags ? `&tags=${hashtags.join("&tags=")}` : "";
      router.push(`?q=${text}${tagsQuery}`);
    }
  };
  return (
    <div className="flex border rounded-full p-2 items-center gap-2 w-full max-w-[500px] bg-accent">
      <Icons.search className="w-7 h-7 p-1" />
      <Input
        type="text"
        placeholder={placeholder}
        className="border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto bg-accent"
        onKeyDown={handleKeyDown}
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      {key && (
        <Icons.close
          className="w-5 h-5 hover:cursor-pointer"
          onClick={() => setKey("")}
        />
      )}
    </div>
  );
}
