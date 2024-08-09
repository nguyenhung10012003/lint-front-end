import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";
import Link from "next/link";
import ProfileAvatar from "../ProfileAvatar";

interface DropDownMenuGroup {
  name: string;
  label?: string;
  items: {
    name: string;
    label: string;
    icon: any;
    href: string;
  }[];
}

export default async function SideBarFooter({
  dropDownMenuGroups,
  user,
}: {
  dropDownMenuGroups: DropDownMenuGroup[];
  user: User;
}) {
  return (
    <div className="flex w-full gap-2 items-center justify-center">
      <ProfileAvatar
        src={user.profile.avatar}
        userId={user.profile.id}
        className="hidden lg:flex"
      />
      <div className="w-full hidden lg:block">
        <div className="font-semibold">{user.profile.name}</div>
        <Link
          className="hover:underline underline-offset-4"
          href={`/profile/${user.id}`}
        >{`@${user.profile.alias}`}</Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-2 hover:bg-primary-foreground rounded-lg hover:scale-105">
            <Icons.menu />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {dropDownMenuGroups.map((group, index) => (
            <div key={group.name}>
              {index !== 0 && <DropdownMenuSeparator className="bg-gray-200" />}
              <DropdownMenuGroup key={group.name}>
                {group.label && (
                  <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                )}
                {group.items.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    className="hover:bg-primary-foreground focus:bg-primary-foreground"
                  >
                    <Link href={item.href} className="flex w-full items-center">
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
