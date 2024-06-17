"use client";
import { useState } from "react";

export default function PostContent({
  dict,
  content,
  tags,
  maxContentLength = 120,
}: {
  dict: {
    seeMore: string;
    collapse: string;
  };
  content: string;
  tags: string[];
  maxContentLength?: number;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const contentDisplay =
    collapsed && content.length > maxContentLength
      ? content.slice(0, maxContentLength) + " ... "
      : content;
  return (
    <>
      <span className="text-md">{contentDisplay}</span>
      {content.length > maxContentLength && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-blue-500 hover:underline"
        >
          {collapsed ? dict.seeMore : dict.collapse}
        </button>
      )}

      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm text-blue-500 hover:underline hover:cursor-pointer"
          >
            {`${tag}`}
          </span>
        ))}
      </div>
    </>
  );
}
