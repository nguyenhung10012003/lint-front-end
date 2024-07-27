"use client";
import api from "@/config/api";
import { Post } from "@/types/post";
import { useCookies } from "next-client-cookies";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import PostCard from "./post/PostCard";

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
    const data = await api.get<any, { posts: Post[] }>(`${url.url}`, {
      params: {
        ...url.params,
        skip: page * postPerFetch,
        take: postPerFetch,
      },
    });
    if (data.posts) {
      setPosts((prev) => [...prev, ...data.posts]);
      setPage(page + 1);
    }
    if (!data.posts || data.posts.length < postPerFetch) setHasMore(false);
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
