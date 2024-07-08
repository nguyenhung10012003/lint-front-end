import { notifications } from "@/mocks/notification.json";
import { formatTimeDifference } from "@/utils/datetime";
import {} from "@radix-ui/react-avatar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function NotificationList() {
  return (
    <>
      {notifications.map((notification) => (
        <Link
          key={notification.id}
          className="flex p-2 hover:bg-accent rounded-lg  gap-4"
          href={notification.linkTo}
        >
          <Avatar className="w-14 h-14">
            <AvatarImage src={notification.avatar} className="object-cover" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <p className="text-md max-h-[100px] line-clamp-3">
              {notification.content}
            </p>
            <p className="text-sm text-blue-500">
              {formatTimeDifference(new Date(notification.createdAt))}
            </p>
          </div>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 ${
                notification.read ? "bg-none" : "bg-primary"
              } rounded-full`}
            ></div>
          </div>
        </Link>
      ))}
    </>
  );
}
