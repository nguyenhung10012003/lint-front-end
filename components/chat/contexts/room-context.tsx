"use client";
import { Message, Room } from "@/types/message";
import { User } from "@/types/user";
import { createContext, useContext, useState } from "react";

const RoomContext = createContext<any>(null);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [members, setMembers] = useState<Map<string, User>>(new Map());

  const changeRoom = (room: Room) => {
    setRoom(room);
    setReplyingTo(null);
    setMembers(new Map());
  };

  const addMember = (member: User) => {
    setMembers(members.set(member.id, member));
  };

  const removeMember = (member: User) => {
    members.delete(member.id);
    setMembers(new Map(members));
  };

  const getMember = (id: string) => {
    return members.get(id);
  };
  return (
    <RoomContext.Provider
      value={{
        room,
        changeRoom,
        replyingTo,
        setReplyingTo,
        addMember,
        removeMember,
        getMember,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};
