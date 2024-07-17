import { Icons } from "@/components/Icons";
import Link from "next/link";

export default function Setting() {
  const settingGroups = [
    {
      name: "profile",
      label: "Profile",
      description: "Edit your profile information",
      href: "/setting/profile",
    },
    {
      name: "privacy",
      label: "Privacy",
      description: "Control your profile visibility and data",
      href: "/setting/privacy",
    },
    {
      name: "application",
      label: "Application",
      description: "Manage your application settings",
      href: "/setting/application",
    },
  ];
  return (
    <div className="flex flex-col w-full gap-4 max-w-[700px]">
      {settingGroups.map((group) => (
        <Link
          key={group.name}
          className="flex gap-2 p-4 bg-secondary rounded-xl shadow-md justify-between items-center hover:bg-secondary/80"
          href={group.href}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{group.label}</h2>
            <p className="text-sm text-gray-500">{group.description}</p>
          </div>
          <Icons.chevronRight className="w-6 h-6" />
        </Link>
      ))}
    </div>
  );
}
