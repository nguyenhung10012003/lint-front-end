"use client";

import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import MagicDiv from "@/components/ui/magic-div";
import api from "@/config/api";
import useDebounce from "@/hooks/use-debounce";
import { extractHashtags } from "@/utils/hashtag";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox({ placeholder }: { placeholder: string }) {
  const [key, setKey] = useState<string>("");
  const search = useDebounce(key, 500);
  const [suggestions, setSuggestions] = useState<undefined | string[]>();
  const [focus, setFocus] = useState(false);

  const router = useRouter();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && key) {
      const { text, hashtags } = extractHashtags(key);
      const tagsQuery = hashtags ? `&tags=${hashtags.join("&tags=")}` : "";
      router.push(`?q=${text}${tagsQuery}`);
    }
  };

  useEffect(() => {
    if (search) {
      api
        .get<any, any>("search/suggestion/name", {
          params: {
            q: search,
            take: 5,
          },
        })
        .then((data) => {
          setSuggestions(
            data?.map((suggestion: any) => {
              return suggestion.text;
            })
          );
        });
    }
    if (!search) {
      setSuggestions(undefined);
    }
  }, [search]);

  return (
    <MagicDiv
      className="flex flex-col border rounded-[25px] py-2 gap-2 w-full max-w-[500px] bg-accent absolute z-10"
      onClickOutside={() => setFocus(false)}
    >
      <div className="flex items-center px-2">
        <Icons.search className="w-7 h-7 p-1" />
        <Input
          type="text"
          placeholder={placeholder}
          className="border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto bg-accent"
          onKeyDown={handleKeyDown}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onFocus={() => setFocus(true)}
        />
        {key && (
          <Icons.close
            className="w-5 h-5 hover:cursor-pointer"
            onClick={() => {
              setKey("");
              setSuggestions(undefined);
            }}
          />
        )}
      </div>
      {focus && suggestions && suggestions.length > 0 && (
        <div className="border-t border-primary">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-accent/15 hover:cursor-pointer"
              onClick={() => {
                setKey(suggestion);
                setFocus(false);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </MagicDiv>
  );
}
