import { cn } from "@/lib/utils";

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
      <h2 className="text-2xl font-bold border-b-2">{title}</h2>
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
  as?: 'div' | 'link' | 'button';
  href?: string;
  className?: string;
}) => {
  return <div className={cn("flex", className)}>{children}</div>;
};
