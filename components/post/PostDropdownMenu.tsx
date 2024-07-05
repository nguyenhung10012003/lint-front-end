"use client";
import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function dictDropdownMenu({
  dict,
}: {
  dict: {
    savePost: string;
    reportPost: string;
    turnOffNotification: string;
    hidePost: string;
  };
}) {
  const dropdownGroups = [
    {
      name: "save",
      items: [
        {
          label: dict.savePost,
          icon: <Icons.save className="h-6 w-6" />,
          action: () => {},
        },
      ],
    },
    {
      name: "report",
      items: [
        {
          label: dict.reportPost,
          icon: <Icons.report className="h-6 w-6" />,
          action: () => {},
        },
      ],
    },
    {
      name: "other",
      items: [
        {
          label: dict.turnOffNotification,
          icon: <Icons.turnOffNotification className="h-6 w-6" />,
          action: () => {},
        },
        {
          label: dict.hidePost,
          icon: <Icons.hide className="h-6 w-6" />,
          action: () => {},
        },
      ],
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.more className="h-10 w-10 p-2 rounded-full hover:bg-primary-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownGroups.map((group, index) => (
          <div key={index}>
            {index !== 0 && <DropdownMenuSeparator className="bg-gray-200" />}
            <DropdownMenuGroup className="flex flex-col gap-2">
              {group.items.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => item.action}
                  className="flex gap-2 items-center p-2 hover:bg-primary-foreground rounded-md hover:cursor-pointer"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
