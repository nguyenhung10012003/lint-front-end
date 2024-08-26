import { getDictionary } from "@/app/dictionaries";
import { Icons } from "@/components/Icons";
import Link from "next/link";

export default async function Setting({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  const settingGroups = [
    {
      name: "profile",
      label: dictionary.setting.profile.title,
      description: dictionary.setting.profile.description,
      href: "/setting/profile",
    },
    {
      name: "privacy",
      label: dictionary.setting.privacy.title,
      description: dictionary.setting.privacy.description,
      href: "/setting/privacy",
    },
    {
      name: "application",
      label: dictionary.setting.application.title,
      description: dictionary.setting.application.description,
      href: "/setting/application",
    },
  ];
  return (
    <>
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
    </>
  );
}
