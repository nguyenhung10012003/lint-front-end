import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "../Icons";

export const SettingGroup = ({
  title,
  id,
  children,
  className,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} id={id}>
      <div className="flex items-center p-2 border-b">
        <Link href="/setting">
          <Icons.arrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="font-bold text-lg w-full text-center">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export const SettingItem = ({
  children,
  as = "div",
  href,
  className,
}: {
  children: React.ReactNode;
  as?: "div" | "link" | "button";
  href?: string;
  className?: string;
}) => {
  return <div className={cn("flex", className)}>{children}</div>;
};
