import { Message as MessageType } from "@/types/message";
import { useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

export default function MessageList() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  return (
    <Virtuoso
      className="flex flex-col gap-2 w-full"
      ref={virtuosoRef}
      data={messages}
      totalCount={messages.length}
      itemContent={(index, message) => {
        return <div />;
      }}
      initialTopMostItemIndex={messages.length - 1}
    />
  );
}
