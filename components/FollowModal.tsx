"use client";
import { api } from "@/config/api";
import useDebounce from "@/hooks/use-debounce";
import { Following } from "@/types/relationship";
import { User } from "@/types/user";
import Link from "next/link";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { Icons } from "./Icons";
import InfiniteScroll from "./InfiniteScroll";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const fetcher = (url: string) => api.get<any, any>(url);
const FollowList = ({
  follows,
  search,
  variant,
  includeAction = false,
  mutate,
  deleteText,
}: {
  follows: Following[];
  search: string;
  variant: "followers" | "followings";
  includeAction?: boolean;
  mutate: () => void;
  deleteText: string;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(follows.length > 0);
  const userPerFetch = 10;
  const loadMore = useCallback(async () => {
    const data = await api.get<any, User[]>(`/user`, {
      params: {
        id: follows
          .slice(page * userPerFetch, page * userPerFetch + userPerFetch)
          .map((follow) => {
            return variant === "followers"
              ? follow.followerId
              : follow.followingId;
          }),
        include: ["profile"],
      },
    });
    if (data) {
      setUsers((prev) => [...prev, ...data]);
      setPage(page + 1);
    }
    if (!data || data.length < userPerFetch) setHasMore(false);
  }, [follows, page, hasMore]);

  const handleDelete = async ({ id, followerId, followingId }: Following) => {
    const data = await api.delete(`/following`, {
      data: {
        id,
        followerId,
        followingId,
      },
    });
    if (data) {
      setUsers((prev) =>
        prev.filter((user) =>
          variant === "followers"
            ? user.id !== followerId
            : user.id !== followingId
        )
      );
      mutate();
    }
  };
  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
      {users
        ?.filter((user) => {
          if (!search) return true;
          return user.profile.alias?.includes(search);
        })
        .map((user, index) => (
          <div key={index} className="flex gap-3 items-center w-full py-2">
            <ProfileAvatar
              src={user.profile.avatar}
              alt={user.profile.name}
              className="w-12 h-12 md:w-12 md:h-12"
              userId={user.id}
              variant="link"
            />
            <div className="flex w-full flex-col items-start">
              <Link
                className="text-md font-semibold hover:underline underline-offset-4"
                href={`/${user.id}`}
              >
                {user.profile.alias}
              </Link>
              <p className="text-sm text-gray-500">{user.profile.name}</p>
            </div>
            {includeAction && (
              <Button
                variant="secondary"
                onClick={() => handleDelete(follows[index])}
              >
                {deleteText || "Delete"}
              </Button>
            )}
          </div>
        ))}
    </InfiniteScroll>
  );
};

export function FollowersModal({
  includeAction,
  userId,
  dict,
}: {
  includeAction?: boolean;
  userId: string;
  dict: any;
}) {
  const [search, setSearch] = useState<string>("");
  const debounce = useDebounce(search, 500);
  const { data, isLoading, error, mutate } = useSWR(
    `/following?followingId=${userId}`,
    fetcher
  );

  if (isLoading) return <></>;
  return (
    <Dialog>
      <DialogTrigger>{`${data?.length || 0} ${
        dict.profile.followersModal.trigger
      }`}</DialogTrigger>
      <DialogContent
        className="flex gap-2 flex-col p-0 w-full max-w-[400px] rounded-xl max-h-[60vh]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl border-b py-2">
            {dict.profile.followersModal.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mx-4 my-2 border-b">
          <Icons.search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col px-4 overflow-y-auto">
          <FollowList
            follows={data || []}
            variant={"followers"}
            search={debounce}
            includeAction={includeAction}
            mutate={mutate}
            deleteText={dict.delete}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FollowingsModal({
  includeAction,
  userId,
  dict,
}: {
  includeAction?: boolean;
  userId: string;
  dict: any;
}) {
  const [search, setSearch] = useState<string>("");
  const debounce = useDebounce(search, 500);
  const { data, isLoading, error, mutate } = useSWR(
    `/following?followerId=${userId}`,
    fetcher
  );
  if (isLoading) return <></>;
  return (
    <Dialog>
      <DialogTrigger>{`${data.length || 0} ${
        dict.profile.followingModal.trigger
      }`}</DialogTrigger>
      <DialogContent
        className="flex gap-2 flex-col p-0 w-full max-w-[400px] rounded-xl max-h-[60vh]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl border-b py-2">
            {dict.profile.followingModal.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mx-4 my-2 border-b">
          <Icons.search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col px-4 overflow-y-auto">
          <FollowList
            follows={data || []}
            variant={"followings"}
            search={debounce}
            includeAction={includeAction}
            mutate={mutate}
            deleteText={dict.delete}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
