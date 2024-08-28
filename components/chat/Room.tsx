"use client";

import { Room as RoomType } from "@/types/message";
import { useEffect } from "react";
import { useRoom } from "./contexts/room-context";
import MessageList from "./MessageList";
import RoomFooter from "./RoomFooter";
import RoomHeader from "./RoomHeader";

export default function Room({
  room,
  dictionary,
}: {
  room: RoomType;
  dictionary: any;
}) {
  const { changeRoom } = useRoom();
  useEffect(() => {
    changeRoom(room);
  }, []);

  return (
    <div className="flex flex-col w-full ">
      <RoomHeader />
      <div className="flex p-6 h-full overflow-y-auto overflow-x-hidden">
        <MessageList />
      </div>
      <RoomFooter />
    </div>
  );
}
