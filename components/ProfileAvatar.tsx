import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProfileAvatar({
  src,
  alt,
  profileId,
  variant = "none",
  className,
}: {
  src: string;
  alt: string;
  profileId: string;
  variant?: "link" | "button" | "none";
  className?: string;
}) {
  const avatar = (
    <Avatar className={cn("md:w-12 md:h-12 w-10 h-10", className)}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback>{alt.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
  if (variant === "link")
    return (
      <Link href={`/${profileId}`} className="self-start">
        {avatar}
      </Link>
    );

  return <div className="flex">{avatar}</div>;
}
