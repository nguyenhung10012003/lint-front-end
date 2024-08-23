"use client";

import Message from "./Message";
import MessageFormBox from "./MessageFormBox";
import RoomHeader from "./RoomHeader";

export default function Room() {
  return (
    <div className="flex flex-col w-full ">
      <RoomHeader />
      <div className="flex p-6 h-full overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-4 w-full">
          <Message />
          <Message />
          <Message />
        </div>
      </div>
      <MessageFormBox />
    </div>
  );
}
