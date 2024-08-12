import { cn } from "@/lib/utils";
import {} from "@radix-ui/react-select";
import { memo } from "react";
import { Icons } from "../Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PostScopeSelectorProps {
  defaultValue?: "PUBLIC" | "PRIVATE";
  onValueChange?: (value: "PUBLIC" | "PRIVATE") => void;
  className?: string;
}

function PostScopeSelector({
  defaultValue,
  onValueChange,
  className,
}: PostScopeSelectorProps) {
  return (
    <Select
      defaultValue={defaultValue || "PUBLIC"}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn("max-w-[150px]", className)}>
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PUBLIC">
          <div className="flex gap-2 items-center">
            <Icons.global className="w-5 h-5" />
            <span>Public</span>
          </div>
        </SelectItem>
        <SelectItem value="PRIVATE">
          <div className="flex gap-2 items-center">
            <Icons.lock className="w-5 h-5" />
            <span>Private</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default memo(PostScopeSelector);
