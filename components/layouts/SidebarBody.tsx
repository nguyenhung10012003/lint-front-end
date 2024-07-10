"use client";
import { NavItem } from "@/types/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreatePostModal from "../CreatePostModal";

export default function SidebarBody({
  sidebarItems,
  createPostText,
}: {
  sidebarItems: NavItem[];
  createPostText: string;
}) {
  const path = usePathname();

  return (
    <>
      {sidebarItems.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.name}
            className={`flex gap-4 p-4 rounded-lg w-full  
              items-center hover:scale-105
                ${
                  path.match(item.pathReg) && "bg-primary-foreground font-bold"
                }`}
          >
            {path.match(item.pathReg) ? item.icon.solid : item.icon.outline}
            <span className="hidden lg:flex items-center">{item.label}</span>
          </Link>
        );
      })}
      <CreatePostModal />
    </>
  );
}
