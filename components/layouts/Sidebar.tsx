import { getDictionary } from "@/app/[lang]/dictionaries";
import { Icons } from "@/components/Icons";
import SideBarFooter from "@/components/layouts/SideBarFooter";
import SidebarBody from "@/components/layouts/SidebarBody";

export default async function Sidebar({ lang }: { lang: string }) {
  const { sidebar, createPost } = await getDictionary(lang);
  const sidebarItems = [
    {
      name: "home",
      label: sidebar.home,
      icon: {
        outline: <Icons.home className="w-6 h-6" />,
        solid: <Icons.home className="w-6 h-6" variant={"solid"} />,
      },
      href: "/",
    },
    {
      name: "search",
      label: sidebar.search,
      icon: {
        outline: <Icons.search className="w-6 h-6" />,
        solid: <Icons.search className="w-6 h-6" variant={"solid"} />,
      },
      href: "/search",
    },
    {
      name: "notification",
      label: sidebar.notification,
      icon: {
        outline: <Icons.notification className="w-6 h-6" />,
        solid: <Icons.notification className="w-6 h-6" variant={"solid"} />,
      },
      href: "/notification",
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
          href: "/help-center",
        },
        {
          name: "report-issue",
          label: sidebar.dropdown.help.items.report,
          icon: Icons.reportIssue,
          href: "/report-issue",
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
    <div className="sm:flex fixed flex-col h-screen lg:w-full lg:max-w-[275px] py-6 px-4 border-r hidden z-40 over">
      <div id="logo">Logo</div>
      <div id="sidebar-body" className="flex gap-2 flex-col mt-10">
        <SidebarBody sidebarItems={sidebarItems} createPostText={""} />
      </div>
      <div id="sidebar-footer" className="items-end flex h-full">
        <SideBarFooter dropDownMenuGroups={dropDownMenuGroups} />
      </div>
    </div>
  );
}