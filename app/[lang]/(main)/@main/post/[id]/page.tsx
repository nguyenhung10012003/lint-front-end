import { getDictionary } from "@/app/dictionaries";
import PostCard from "@/components/post/PostCard";
import { api } from "@/config/api";
import { Post } from "@/types/post";

export default async function PostPage({
  params,
}: {
  params: {
    lang: string;
    id: string;
  };
}) {
  const [post, dictionary] = await Promise.all([
    api.get<any, Post>(`/post/${params.id}`),
    getDictionary(params.lang),
  ]);
  return <PostCard dictionary={dictionary} post={post} />;
}
