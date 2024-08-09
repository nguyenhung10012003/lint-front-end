"use client";
import api from "@/config/api";
import { User } from "@/types/user";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import FollowBtn from "./FollowBtn";
import InfiniteScroll from "./InfiniteScroll";
import ProfileAvatar from "./ProfileAvatar";
import ProfileHoverCard from "./ProfileHoverCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function UserSearchList({
  q,
  dictionary,
}: {
  q: string;
  dictionary: any;
}) {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const userPerfetch = 3;
  useEffect(() => {
    setUsers([]);
    setPage(0);
    setHasMore(true);
    loadMore();
  }, [q]);

  const loadMore = useCallback(async () => {
    const users = await api.get<any, { _source: User }[]>(`search/user`, {
      params: {
        q: q,
        take: userPerfetch,
        skip: page * userPerfetch,
      },
    });
    if (users) {
      setUsers((prev) => [
        ...prev,
        ...users.map((result) => result["_source"]),
      ]);
      setPage(page + 1);
    }
    if (users.length < userPerfetch) setHasMore(false);
  }, [page, hasMore]);

  return (
    users &&
    users.length > 0 && (
      <Card className="w-full max-w-[550px] rounded-lg mt-20">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{dictionary.search.searchResult.people}</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-4 max-h-[300px] overflow-y-auto py-1">
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            className="flex flex-col gap-4"
          >
            {users.map((user, index) => (
              <div
                className="flex gap-2 justify-between items-center "
                key={index}
              >
                <div className="flex gap-2">
                  <ProfileAvatar
                    src={user.profile?.avatar}
                    alt={user.profile?.name}
                    variant="link"
                    className="w-10 h-10"
                    userId={user.id}
                  />
                  <div className="flex flex-col items-start">
                    <Link
                      className="text-md font-semibold"
                      href={`/profile/${user.id}`}
                    >
                      {user.profile?.name}
                    </Link>
                    <ProfileHoverCard
                      profile={user.profile}
                      aliasClassName="text-sm text-gray-600 dark:text-gray-300"
                    />
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
        </CardContent>
      </Card>
    )
  );
}

export default memo(UserSearchList);
