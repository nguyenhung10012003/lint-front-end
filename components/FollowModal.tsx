"use client";
import follows from "@/mocks/follow.json";
import Link from "next/link";
import { title } from "process";
import { useState } from "react";
import { Icons } from "./Icons";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function FollowersModal({ includeAction }: { includeAction?: boolean }) {
  const [search, setSearch] = useState<string>("");
  return (
    <Dialog>
      <DialogTrigger>{"0 Followers"}</DialogTrigger>
      <DialogContent className="flex gap-2 flex-col p-0 w-full max-w-[400px] rounded-xl max-h-[60vh]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl border-b py-2">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mx-4 my-2 border-b">
          <Icons.search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col px-4 overflow-y-auto">
          {follows
            .filter((item) => item.alias.includes(search))
            .map((item) => (
              <div
                key={item.id}
                className="flex gap-3 items-center w-full py-2"
              >
                <ProfileAvatar
                  src={item.avatar}
                  alt={""}
                  className="w-12 h-12 md:w-12 md:h-12"
                  profileId={item.id}
                  variant="link"
                />
                <div className="flex w-full flex-col items-start">
                  <Link
                    className="text-md font-semibold hover:underline underline-offset-4"
                    href={`/${item.id}`}
                  >
                    {item.alias}
                  </Link>
                  <p className="text-sm text-gray-500">{item.name}</p>
                </div>
                {includeAction && (
                  <Button className="rounded-xl" variant="secondary">
                    Delete
                  </Button>
                )}
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FollowingsModal({
  includeAction,
}: {
  includeAction?: boolean;
}) {
  const [search, setSearch] = useState<string>("");
  return (
    <Dialog>
      <DialogTrigger>{"0 Followings"}</DialogTrigger>
      <DialogContent className="flex gap-2 flex-col p-0 w-full max-w-[400px] rounded-xl max-h-[60vh]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl border-b py-2">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mx-4 my-2 border-b">
          <Icons.search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col px-4 overflow-y-auto">
          {follows
            .filter((item) => item.alias.includes(search))
            .map((item) => (
              <div
                key={item.id}
                className="flex gap-3 items-center w-full py-2"
              >
                <ProfileAvatar
                  src={item.avatar}
                  alt={""}
                  className="w-12 h-12 md:w-12 md:h-12"
                  profileId={item.id}
                  variant="link"
                />
                <div className="flex w-full flex-col items-start">
                  <Link
                    className="text-md font-semibold hover:underline underline-offset-4"
                    href={`/${item.id}`}
                  >
                    {item.alias}
                  </Link>
                  <p className="text-sm text-gray-500">{item.name}</p>
                </div>
                {includeAction && (
                  <Button className="rounded-xl" variant="secondary">
                    Delete
                  </Button>
                )}
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
