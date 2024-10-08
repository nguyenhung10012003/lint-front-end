"use client";
import { api } from "@/config/api";
import { cn } from "@/lib/utils";
import { useCookies } from "next-client-cookies";
import useSWR from "swr";
import { Button } from "./ui/button";


export default function FollowBtn({
  followingId,
  followBtnClassName,
  unfollowBtnClassName,
}: {
  followingId: string;
  followBtnClassName?: string;
  unfollowBtnClassName?: string;
}) {
  const cookies = useCookies();
  const userId = cookies.get("userId");
  const fetcher = (url: string) =>
    api.get<any, any>(url, {
      params: {
        where: {
          followerId: userId,
          followingId: followingId,
        }
      }
    }).then((res) => res);
  
  const { data, error, isLoading, mutate } = useSWR<any, any>(
    "/following",
    fetcher,
  );
  const isFollowing = data && data?.length > 0;
  const isAccepted = data ? data[0]?.accepted : false; 
  const handleFollow = async () => {
    try {
      await api.post("/following", {
        followingId,
      });
      mutate();
    } catch (e) {}
  };
  const handleUnfollow = async () => {
    try {
      await api.delete(`/following`, {
        data: {
          followingId,
          followerId: userId,
          id: data? data[0]?.id : '',
        },
      });
      mutate();
    } catch (e) {}
  };
  if (isLoading || userId === followingId) return <></>;
  return !isFollowing ? (
    <Button
      className={cn(
        "text-white font-semibold w-full",
        followBtnClassName
      )}
      onClick={handleFollow}
    >
      Follow
    </Button>
  ) : (
    <Button
      className={cn("font-semibold w-full", unfollowBtnClassName)}
      variant="secondary"
      onClick={handleUnfollow}
    >
      { isAccepted ? "Unfollow" : "Requested" }
    </Button>
  );
}
