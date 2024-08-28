import { cn } from "@/lib/utils";
import React from "react";

export interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "border-none flex rounded-lg focus-visible:ring-0 relative bg-accent px-3 py-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-sm min-h-0 resize-none max-h-[80px] placeholder:text-muted-foreground",
        className
      )}
      {...props}
      ref={ref}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      }}
    />
  );
});
AutoResizeTextarea.displayName = "AutoResizeTextarea";

export { AutoResizeTextarea };
