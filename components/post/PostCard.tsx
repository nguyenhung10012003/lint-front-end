"use client";

import api from "@/config/api";
import { Post } from "@/types/post";
import { formatTimeDifference } from "@/utils/datetime";
import { getRandomInt } from "@/utils/number";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { memo } from "react";
import useSWR from "swr";
import ProfileAvatar from "../ProfileAvatar";
import ProfileHoverCard from "../ProfileHoverCard";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import PostActions from "./PostActions";
import PostCarousel from "./PostCarousel";
import PostContent from "./PostContent";
import PostDropdownMenu from "./PostDropdownMenu";

interface PostCardProps {
  dictionary: any;
  post: Post;
  isAuthor?: boolean;
}

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

const fetcher = (urls: string[]) => {
  return Promise.all(
    urls.map((url) => {
      return api.get<any, any>(url);
    })
  );
};

function PostCardSkeleton() {
  return (
    <Card
      className={`${roboto.className} max-w-[550px] w-full shadow-md flex flex-col`}
    >
      <CardHeader className="">
        <div className="flex gap-2 items-center">
          <ProfileAvatar variant="skeleton" />
          <div className="flex flex-col font-bold gap-2">
            <Skeleton className="w-[100px] h-4"></Skeleton>
            <Skeleton className="w-[80px] h-3"></Skeleton>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 w-full">
        <Skeleton
          className={`h-3`}
          style={{ width: `${getRandomInt(50, 100)}%` }}
        />
        <Skeleton
          className={`h-3`}
          style={{ width: `${getRandomInt(20, 100)}%` }}
        />
        <Skeleton
          className={`h-3`}
          style={{ width: `${getRandomInt(1, 100)}%` }}
        />
        <Skeleton className="h-[300px] mt-3 " />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Skeleton className="w-10 h-6 rounded-full"></Skeleton>
        <Skeleton className="w-10 h-6 rounded-full"></Skeleton>
        <Skeleton className="w-10 h-6 rounded-full"></Skeleton>
      </CardFooter>
    </Card>
  );
}

function PostCard({ post, dictionary, isAuthor = false }: PostCardProps) {
  const { data, error, isLoading, mutate } = useSWR(
    [
      `/user/${post.userId}`,
      `/comment/count?postId=${post.id}`,
      `/like/count?postId=${post.id}`,
      `/like/exist?postId=${post.id}`,
    ],
    fetcher
  );
  const [author, comments, likes, exist] = data || [];

  if (isLoading) return <PostCardSkeleton />;

  return (
    <Card className={`${roboto.className} max-w-[550px] w-full shadow-md`}>
      <CardHeader className="">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <ProfileAvatar
              src={author.profile.avatar}
              variant="link"
              profileId={author.profile.id}
            />
            <div className="flex flex-col font-bold">
              <div className="flex items-center gap-2">
                <Link href={`/profile/${author.id}`}>
                  {author.profile.name}
                </Link>
                <div className="bg-gray-400 rounded-full w-[5px] h-[5px]"></div>
                <span className="text-gray-400 text-sm">
                  {formatTimeDifference(new Date(post.createdAt || ""))}
                </span>
              </div>
              <ProfileHoverCard
                aliasClassName="font-md text-sm"
                profile={author.profile}
              ></ProfileHoverCard>
            </div>
          </div>
          <div className="flex justify-end">
            <PostDropdownMenu dict={dictionary.post.moreDropdown} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <PostContent
          dict={{
            seeMore: dictionary.post.seeMore,
            collapse: dictionary.post.collapse,
          }}
          content={post.content || ""}
          tags={post.tags?.map((tag) => tag.name) || []}
        />
        <PostCarousel images={post.medias || []} />
      </CardContent>
      <CardFooter>
        <PostActions
          likes={likes.count}
          comments={comments.count}
          liked={exist.exist}
          postId={post.id || ""}
          mutate={mutate}
        />
      </CardFooter>
    </Card>
  );
}

export default memo(PostCard);
