"use client";
import api from "@/config/api";
import { Post } from "@/types/post";
import { useCookies } from "next-client-cookies";
import { useCallback, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import PostCard from "./post/PostCard";

export default function Feed({ dictionary }: { dictionary: any }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const postPerFetch = 1;

  const loadMore = useCallback(async () => {
    console.log(page);
    const newPage = page + 1;
    const data = await api.get<any, { posts: Post[] }>(
      `/feed?skip=${page * postPerFetch}&take=${postPerFetch}`
    );
    if (data.posts) {
      setPosts((prev) => [...prev, ...data.posts]);
      setPage(newPage);
    }
    if (!data.posts || data.posts.length < postPerFetch) setHasMore(false);
  }, [page]);

  // useEffect(() => {
  //   loadMore();
  // }, []);
  const cookies = useCookies();

  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMore}
      className="flex flex-col gap-3 items-center"
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
