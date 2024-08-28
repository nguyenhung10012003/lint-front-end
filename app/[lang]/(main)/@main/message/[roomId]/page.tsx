import { getDictionary } from "@/app/dictionaries";
import { chatApi } from "@/config/api";
import { Room as RoomType } from "@/types/message";
import dynamic from "next/dynamic";

const Room = dynamic(() => import("@/components/chat/Room"));

export default async function ChatRoomPage({
  params,
}: {
  params: {
    lang: string;
    roomId: string;
  };
}) {
  const [dictionary, room] = await Promise.all([
    getDictionary(params.lang),
    chatApi.get<any, RoomType>(`/room/${params.roomId}`),
  ]);
  
  return <Room dictionary={dictionary} room={room} />;
}
