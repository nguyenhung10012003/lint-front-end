import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {} from "@radix-ui/react-dialog";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function ProfileAvatar({
  src,
  alt,
  profileId,
  variant = "none",
  className,
}: {
  src?: string;
  alt?: string;
  profileId?: string;
  variant?: "link" | "button" | "none" | "input" | "modal";
  className?: string;
}) {
  const avatar = (
    <Avatar className={cn("md:w-12 md:h-12 w-10 h-10 bg-gray-200", className)}>
      <AvatarImage
        src={src || "/image/default_avatar.png"}
        alt={alt}
        className="object-cover"
      />
      <AvatarFallback>{alt?.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
  if (variant === "link" && profileId)
    return (
      <Link href={`/${profileId}`} className="">
        {avatar}
      </Link>
    );
  else if (variant === "modal")
    return (
      <Dialog>
        <DialogTrigger>{avatar}</DialogTrigger>
        <DialogContent>
          <img src={src || "/image/default_avatar.png"} alt="" />
        </DialogContent>
      </Dialog>
    );

  return <div className="flex">{avatar}</div>;
}
