import { Icons } from "@/components/Icons";
import SideBarFooter from "@/components/layouts/SideBarFooter";
import SidebarBody from "@/components/layouts/SidebarBody";
import { User } from "@/types/user";
import Image from "next/image";
import NotificationWithBadge from "../notification/NotificationWithBadge";

export default async function Sidebar({
  dictionary,
  user,
}: {
  dictionary: any;
  user: User;
}) {
  const sidebar = dictionary.sidebar;
  const sidebarItems = [
    {
      name: "home",
      label: sidebar.home,
      icon: {
        outline: <Icons.home className="w-6 h-6" />,
        solid: <Icons.home className="w-6 h-6" variant={"solid"} />,
      },
      href: "/",
      pathReg: "^/[a-zA-Z]{2}(-[a-zA-Z]{2})?$",
    },
    {
      name: "search",
      label: sidebar.search,
      icon: {
        outline: <Icons.search className="w-6 h-6" />,
        solid: <Icons.search className="w-6 h-6" variant={"solid"} />,
      },
      href: "/search",
      pathReg: "^/[a-zA-Z]{2}(-[a-zA-Z]{2})?/search$",
    },
    {
      name: "notification",
      label: sidebar.notification,
      icon: {
        outline: <NotificationWithBadge variant="outline" />,
        solid: <NotificationWithBadge variant="solid" />,
      },
      href: "/notification",
      pathReg: "^/[a-zA-Z]{2}(-[a-zA-Z]{2})?/notification$",
    },
    // {
    //   name: "message",
    //   label: sidebar.message,
    //   icon: {
    //     outline: <Icons.message className="w-6 h-6" />,
    //     solid: <Icons.message className="w-6 h-6" variant={"solid"} />,
    //   },
    //   href: "/message",
    // },
  ];
  const dropDownMenuGroups = [
    {
      name: "account",
      label: sidebar.dropdown.account.label,
      items: [
        {
          name: "profile",
          label: sidebar.dropdown.account.items.profile,
          icon: Icons.profile,
          href: "/profile",
        },
        {
          name: "setting",
          label: sidebar.dropdown.account.items.setting,
          icon: Icons.setting,
          href: "/setting",
        },
      ],
    },
    {
      name: "help",
      label: sidebar.dropdown.help.label,
      items: [
        {
          name: "help-center",
          label: sidebar.dropdown.help.items.help,
          icon: Icons.help,
          href: "/help",
        },
        {
          name: "report-issue",
          label: sidebar.dropdown.help.items.report,
          icon: Icons.reportIssue,
          href: "/report",
        },
      ],
    },
    {
      name: "logout",
      items: [
        {
          name: "logout",
          label: sidebar.dropdown.logout,
          icon: Icons.logout,
          href: "/logout",
        },
      ],
    },
  ];

  return (
    <div className="sm:inline-flex flex-col h-screen lg:w-full lg:max-w-[275px] py-6 px-4 border-r hidden z-40 over">
      <div id="logo" className="flex justify-center">
        <a href="/">
          <Image
            src={"/logo.png"}
            alt={""}
            width={250}
            height={250}
            className="w-14 h-14"
          />
        </a>
      </div>
      <div id="sidebar-body" className="flex gap-2 flex-col mt-6">
        <SidebarBody
          sidebarItems={sidebarItems}
          user={user}
          dictionary={dictionary}
        />
      </div>
      <div id="sidebar-footer" className="items-end flex h-full">
        <SideBarFooter dropDownMenuGroups={dropDownMenuGroups} user={user} />
      </div>
    </div>
  );
}
