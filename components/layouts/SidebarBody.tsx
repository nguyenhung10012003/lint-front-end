"use client";
import CreatePostModal from "@/components/post/CreatePostModal";
import { NavItem } from "@/types/nav";
import { User } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarBody({
  sidebarItems,
  user,
}: {
  sidebarItems: NavItem[];
  user: User;
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
      <CreatePostModal user={user} />
    </>
  );
}
