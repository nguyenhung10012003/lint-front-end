"use client";
import { api } from "@/config/api";
import { Post } from "@/types/post";
import { useCookies } from "next-client-cookies";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
const PostCard = dynamic(() => import("./post/PostCard"), { ssr: false });

export default function PostList({
  dictionary,
  url,
  postPerFetch = 2,
}: {
  dictionary: any;
  url: Url;
  postPerFetch?: number;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  useEffect(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
  }, [url]);
  const loadMore = useCallback(async () => {
    const data = await api.get<any, Post[]>(`${url.url}`, {
      params: {
        ...url.params,
        idsNotIn: posts.map((post) => post.id),
        take: postPerFetch,
      },
    });
    if (data) {
      setPosts((prev) => [...prev, ...data]);
      setPage(page + 1);
    }
    if (!data || data.length === 0) setHasMore(false);
  }, [page, hasMore]);

  // useEffect(() => {
  //   loadMore();
  // }, []);
  const cookies = useCookies();

  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMore}
      className="flex flex-col gap-3 w-full items-center"
    >
      {posts?.map((post, index) => (
        <PostCard
          key={index}
          post={post}
          dictionary={dictionary}
          isAuthor={cookies.get("userId") === post.userId}
        />
      ))}
    </InfiniteScroll>
  );
}
