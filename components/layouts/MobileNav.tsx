"use client";
import { User } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";
import NotificationWithBadge from "../notification/NotificationWithBadge";
import CreatePostModal from "../post/CreatePostModal";

export default function MobileNav({
  dictionary,
  user,
}: {
  dictionary: any;
  user: User;
}) {
  const items = [
    {
      name: "home",
      icon: Icons.home,
      href: "/",
      pathReg: "^/[a-zA-Z]{2}(-[a-zA-Z]{2})?$",
    },
    {
      name: "search",
      icon: Icons.search,
      href: "/search",
      pathReg: "^/[a-zA-Z]{2}(-[a-zA-Z]{2})?/search$",
    },
    {
      name: "create-post",
      type: "component",
      component: <CreatePostModal user={user} dictionary={dictionary} />,
    },
    {
      name: "notification",
      icon: NotificationWithBadge,
      href: "/notification",
      pathReg: "^/[a-zA-Z]{2}(-[a-zA-Z]{2})?/notification$",
    },
    {
      name: "profile",
      icon: Icons.profile,
      href: "/profile",
    },
  ];
  const path = usePathname();

  return (
    <div className="sm:hidden flex border-t w-full justify-center gap-2 p-2 flex-wrap z-40 bg-background">
      {items.map((item) =>
        item.type === "component" ? (
          <div key={item.name}>{item.component}</div>
        ) : (
          item.icon &&
          item.href && (
            <Link
              key={item.name}
              href={item.href}
              className={`p-4 rounded-lg hover:scale-105 ${
                item.pathReg &&
                path.match(item.pathReg) &&
                "bg-primary-foreground font-bold"
              }`}
            >
              <item.icon
                className="h-6 w-6"
                variant={
                  item.pathReg && path.match(item.pathReg) ? "solid" : "outline"
                }
              />
            </Link>
          )
        )
      )}
    </div>
  );
}
