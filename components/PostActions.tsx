"use client";
import { formatToShortNumber } from "@/utils/number";
import { Icons } from "./Icons";

export default function PostActions({
  likes,
  comments,
  liked,
}: {
  likes: number;
  comments: number;
  liked: boolean;
}) {
  const actions = [
    {
      name: "like",
      icon: Icons.heart,
      count: likes,
      actived: liked,
      onclick: () => console.log("like"),
    },
    {
      name: "comment",
      icon: Icons.message,
      count: comments,
      onclick: () => console.log("comment"),
    },
    {
      name: "share",
      icon: Icons.share,
      count: 0,
      onclick: () => console.log("share"),
    },
  ];
  return (
    <div className="flex gap-4">
      {actions.map(({ name, icon, count, onclick, actived }, index) => (
        <div
          key={index}
          className="flex gap-1 items-center cursor-pointer hover:scale-105 text-gray-700 dark:text-gray-300"
          onClick={onclick}
        >
          {icon({
            className: `w-6 h-6 ${actived && "text-red-500"}`,
            variant: actived ? "solid" : "outline",
          })}
          <span className="text-sm font-semibold">
            {formatToShortNumber(count)}
          </span>
        </div>
      ))}
    </div>
  );
}
