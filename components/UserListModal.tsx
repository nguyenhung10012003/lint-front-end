import {} from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "./Icons";
import ProfileAvatar from "./ProfileAvatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function UserListModal({
  trigger,
  title,
  items,
  triggerAschild = false,
  actionBtn,
  includeAction = true,
}: {
  trigger: string | React.ReactNode;
  title: string;
  items: any[];
  triggerAschild?: boolean;
  actionBtn?: React.ReactNode;
  includeAction?: boolean;
}) {
  const [search, setSearch] = useState<string | undefined>("");
  return (
    <Dialog>
      <DialogTrigger asChild={triggerAschild}>{trigger}</DialogTrigger>
      <DialogContent className="flex gap-2 flex-col p-0 w-full max-w-[400px] rounded-xl max-h-[60vh]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl border-b py-2">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mx-4 my-2 border-b">
          <Icons.search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col px-4 overflow-y-auto">
          {items
            .filter((item) => item.alias.includes(search))
            .map((item) => (
              <div
                key={item.id}
                className="flex gap-3 items-center w-full py-2"
              >
                <ProfileAvatar
                  src={item.avatar}
                  alt={""}
                  className="w-12 h-12 md:w-12 md:h-12"
                  profileId={item.id}
                  variant="link"
                />
                <div className="flex w-full flex-col items-start">
                  <Link
                    className="text-md font-semibold hover:underline underline-offset-4"
                    href={`/${item.id}`}
                  >
                    {item.alias}
                  </Link>
                  <p className="text-sm text-gray-500">{item.name}</p>
                </div>
                {includeAction && actionBtn}
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
