"use client";
import api from "@/config/api";
import { User } from "@/types/user";
import { useCallback, useEffect, useState } from "react";
import FollowBtn from "./FollowBtn";
import InfiniteScroll from "./InfiniteScroll";
import ProfileAvatar from "./ProfileAvatar";
import ProfileHoverCard from "./ProfileHoverCard";

export default function UserList({ usersId }: { usersId: { id: string }[] }) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const userPerfetch = 3;
  useEffect(() => {
    setUsers([]);
    setPage(0);
    setHasMore(true);
  }, [usersId]);

  const loadMore = useCallback(async () => {
    const users = await Promise.all(
      usersId
        .slice(page * userPerfetch, page * userPerfetch + userPerfetch)
        .map(async (user) => {
          return await api.get<any, User>(`/user/${user.id}`);
        })
    );
    if (users) {
      setUsers((prev) => [...prev, ...users]);
      setPage(page + 1);
    }
  }, [page, hasMore]);
  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMore}
      className="flex flex-col gap-4 "
    >
      {users.map((user, index) => (
        <div className="flex gap-2 justify-between items-center " key={index}>
          <div className="flex gap-2">
            <ProfileAvatar
              src={user.profile.avatar}
              alt={user.profile.name}
              variant="link"
              className="w-10 h-10"
              profileId={user.id}
            />
            <div className="">
              <ProfileHoverCard user={user} />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {user.profile.bio}
              </p>
            </div>
          </div>

          <FollowBtn
            followingId={user.id}
            followBtnClassName="max-w-[150px]"
            unfollowBtnClassName="max-w-[150px]"
          />
        </div>
      ))}
    </InfiniteScroll>
  );
}
