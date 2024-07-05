"use client";
import Link from "next/link";
import { useState } from "react";
import CreatePostModal from "../CreatePostModal";
import { Icons } from "../Icons";

export default function MobileNav({ lang }: { lang: string }) {
  const items = [
    {
      name: "home",
      icon: Icons.home,
      href: "/",
    },
    {
      name: "search",
      icon: Icons.search,
      href: "/search",
    },
    {
      name: "create-post",
      type: "component",
      component: <CreatePostModal />,
    },
    {
      name: "notification",
      icon: Icons.notification,
      href: "/notification",
    },
    {
      name: "profile",
      icon: Icons.profile,
      href: "/profile",
    },
  ];
  const [active, setActive] = useState("home");

  return (
    <div className="fixed sm:hidden flex bottom-0 border-t w-full justify-center gap-2 p-2 flex-wrap z-40 bg-background">
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
                active === item.name && "bg-primary-foreground font-bold"
              }`}
              onClick={() => setActive(item.name)}
            >
              <item.icon
                className="h-6 w-6"
                variant={active === item.name ? "solid" : "outline"}
              />
            </Link>
          )
        )
      )}
    </div>
  );
}
