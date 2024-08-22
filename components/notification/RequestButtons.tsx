"use client";
import api from "@/config/api";
import { Button } from "../ui/button";
import { Following } from "@/types/relationship";
import { useState } from "react";

export function RequestButtons({
  request,
  removeRequest,
  handleClick
}: {
  request: Following,
  removeRequest?: (id: string) => void,
  handleClick?: () => void
}) {
  const [reply, setReply] = useState<"ACCEPT" | "DECLINE" | "PENDING">("PENDING");
  const handleAccept = async ({ id, follower }: Following) => {
    try {
      await api.patch("/following/accept", {
        id,
        followerId: follower?.profile.userId,
      });
      setReply("ACCEPT");
      if (removeRequest) {
        removeRequest(id);
      }
      if (handleClick) {
        handleClick();
      }
    } catch (e) { }
  }

  const handleDecline = async ({ id, follower }: Following) => {
    try {
      await api.delete("/following", {
        data: {
          id,
          followerId: follower?.profile.userId,
        }
      });
      setReply("DECLINE");
      if (removeRequest) {
        removeRequest(id);
      }
      if (handleClick) {
        handleClick();
      }
    } catch (e) { }
  }
  return (
    <div className="flex gap-2 w-full max-w-[200px]">
      {!request.accepted && reply === "PENDING" ? (
        <>
          <Button className="text-white flex-1 font-semibold" 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleAccept(request);
          }}>
            Accept
          </Button>
          <Button variant={"outline"}
            className="flex-1 font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDecline(request);
            }}>
            Decline
          </Button>
        </>
      ) :  (
        <p className="text-sm text-gray-500">
          {reply === "DECLINE" ? "Request removed" : "You accepted this request"}
        </p>
        ) 
      }
    </div>
  )
}
