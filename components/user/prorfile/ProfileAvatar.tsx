import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../../ui/dialog";
import {Skeleton} from "../../ui/skeleton";

export default function ProfileAvatar({
                                        src,
                                        alt,
                                        userId,
                                        variant = "none",
                                        className,
                                      }: {
  src?: string;
  alt?: string;
  userId?: string;
  variant?: "link" | "button" | "none" | "input" | "modal" | "skeleton";
  className?: string;
}) {
  const avatar = (
    <Avatar className={cn("w-12 h-12  bg-gray-200", className)}>
      <AvatarImage
        src={src || "/image/default_avatar.png"}
        alt={alt}
        className="object-cover"
      />
      <AvatarFallback>{alt?.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
  if (variant === "link" && userId)
    return (
      <Link href={`/profile/${userId}`} className="">
        {avatar}
      </Link>
    );
  else if (variant === "modal")
    return (
      <Dialog>
        <DialogTrigger>{avatar}</DialogTrigger>
        <DialogContent
          className="flex p-0 justify-center min-w-0"
          includeClose={false}
          aria-describedby={undefined}
        >
          <DialogTitle></DialogTitle>
          <Image
            src={src || "/image/default_avatar.png"}
            alt=""
            width={1000}
            height={1000}
            className="object-contain sm:max-w-[90vw] sm:max-h-[90vh] lg:max-w-[80vw] lg:max-h-[90vh] flex"
          />
        </DialogContent>
      </Dialog>
    );
  else if (variant === "skeleton")
    return (
      <Skeleton
        className={cn("md:w-12 md:h-12 w-10 h-10 rounded-full", className)}
      />
    );

  return <div className="flex">{avatar}</div>;
}
