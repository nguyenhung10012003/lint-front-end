"use client";
import api from "@/config/api";
import { Following } from "@/types/relationship";
import { formatTimeDifference } from "@/utils/datetime";
import Cookie from "js-cookie";
import { useCallback, useState } from "react";
import InfiniteScroll from "../InfiniteScroll";
import ProfileAvatar from "../user/prorfile/ProfileAvatar";
import ProfileHoverCard from "../user/prorfile/ProfileHoverCard";
import { RequestButtons } from "./RequestButtons";

export default function FollowRequestList() {
  const [requests, setRequests] = useState<Following[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const requestsPerFetch = 5;

  const userId = Cookie.get("userId");

  const loadMore = useCallback(async () => {
    const data = await api.get<any, Following[]>(`/following`, {
      params: {
        userId,
        variant: "followers",
        take: requestsPerFetch,
        skip: page * requestsPerFetch,
        accepted: "false",
        search: "",
      },
    });

    if (data) {
      setRequests([...requests, ...data]);
      setPage(page + 1);
    }
    if (!data || data.length < requestsPerFetch) {
      setHasMore(false);
    }
  }, [page, userId, requests]);

  const removeRequest = (id: string) => {
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
      {requests.map((request: any, index: number) => (
        <div className="flex gap-4 mt-4" key={index}>
          <ProfileAvatar
            src={request.follower?.profile.avatar}
            alt={request.follower?.profile.alias}
            userId={request.follower?.profile.userId}
            variant="link"
            className="self-start w-10 h-10 md:w-10 md:h-10"
          />
          <div className="flex w-full pb-2 border-b justify-between md:flex-row flex-col gap-2">
            <div>
              <ProfileHoverCard
                profile={request.follower?.profile}
              ></ProfileHoverCard>
              <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
                {formatTimeDifference(new Date(request.createdAt))}
              </span>
              <p className="text-sm text-gray-500">{`${request.follower?.profile.name} has sent you a follow request`}</p>
            </div>
            <RequestButtons
              request={requests[index]}
              removeRequest={removeRequest}
            />
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
}
