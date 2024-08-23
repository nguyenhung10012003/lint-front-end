import { useCallback, useState } from "react";
import { Icons } from "../Icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Message() {
  const isOwnMessage = false;
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div
                className={`rounded-2xl p-3 text-sm text-white max-w-[550px] break-word ${
                  isOwnMessage ? "bg-primary" : "bg-muted"
                }`}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </div>
            <div
              className={`${
                isHovered ? "flex" : "flex"
              } gap-2 items-center h-full`}
            >
              <Icons.reply className="w-5 h-5 text-muted-foreground" />
              <Icons.emoji className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">2:34 PM</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
