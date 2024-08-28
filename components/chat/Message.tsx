import { Message as MessageType } from "@/types/message";
import { Profile } from "@/types/user";
import { formatTimeAgoV2 } from "@/utils/datetime";
import { useCallback, useState } from "react";
import { Icons } from "../Icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface MessageProps {
  isOwnMessage?: boolean;
  profile: Profile;
  message: MessageType;
}

export default function Message({
  isOwnMessage = false,
  profile,
  message,
}: MessageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  return (
    <div
      className={`flex gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={profile.avatar} alt="" />
        <AvatarFallback>{profile.name?.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`rounded-2xl p-3 text-sm max-w-[550px] break-word ${
                  isOwnMessage ? "bg-primary text-white" : "bg-accent"
                }`}
              >
                {message.text}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-xs">
                {formatTimeAgoV2(message.createdAt)}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className={`${isHovered ? "flex" : "flex"} gap-2 items-center h-full`}
      >
        <Icons.reply className="w-5 h-5 text-muted-foreground" />
        <Icons.emoji className="w-5 h-5 text-muted-foreground" />
      </div>
    </div>
  );
}
