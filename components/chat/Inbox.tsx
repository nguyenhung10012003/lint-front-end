import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Inbox() {
  return (
    <Link
      href="#"
      className="flex items-center gap-2 rounded-md p-1 hover:bg-muted max-w-[300px]"
      prefetch={false}
    >
      <Avatar className="lg:h-10 h-16 lg:w-10 w-16">
        <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <div className="overflow-hidden lg:flex hidden flex-col">
        <div className="font-medium truncate">Sarah Miller</div>
        <div className="text-sm text-muted-foreground truncate">
          Let's discuss the project timeline
        </div>
      </div>
      <div className="text-xs text-muted-foreground lg:flex hidden whitespace-nowrap">
        9:22 AM
      </div>
    </Link>
  );
}
