"use client";
import api from "@/config/api";
import { cn } from "@/lib/utils";
import { Following } from "@/types/relationship";
import { useCookies } from "next-client-cookies";
import useSWR from "swr";
import { Button } from "./ui/button";

const fetcher = (url: string) =>
  api.get<any, { follows: Following[] }>(url).then((res) => res);

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
  const { data, error, isLoading, mutate } = useSWR<{ follows: Following[] }>(
    `/following?followingId=${followingId}&followerId=${userId}`,
    fetcher,
  );

  const isFollowing = data && data.follows;
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
          id: data?.follows[0]?.id,
        },
      });
      mutate();
    } catch (e) {}
  };
  if (isLoading || userId === followingId) return <></>;
  return !isFollowing ? (
    <Button
      className={cn(
        "text-white font-semibold w-full max-w-[150px]",
        followBtnClassName
      )}
      onClick={handleFollow}
    >
      Follow
    </Button>
  ) : (
    <Button
      className={cn("font-semibold w-full max-w-[150px]", unfollowBtnClassName)}
      variant="secondary"
      onClick={handleUnfollow}
    >
      Unfollow
    </Button>
  );
}
