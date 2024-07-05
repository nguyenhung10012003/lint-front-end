"use client";
import { NavItem } from "@/types/nav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreatePostModal from "../CreatePostModal";

export default function SidebarBody({
  sidebarItems,
  createPostText,
}: {
  sidebarItems: NavItem[];
  createPostText: string;
}) {
  const [active, setActive] = useState<string | undefined>("home");
  const router = useRouter();
  return (
    <>
      {sidebarItems.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className={`flex gap-4 p-4 rounded-lg w-full  
              items-center hover:scale-105
                ${item.name === active && "bg-primary-foreground font-bold"}`}
          onClick={() => setActive(item.name)}
        >
          {active === item.name ? item.icon.solid : item.icon.outline}
          <span className="hidden lg:flex items-center">{item.label}</span>
        </Link>
      ))}
      <CreatePostModal />
    </>
  );
}
