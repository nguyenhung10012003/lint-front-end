import PostCard from "@/components/post/PostCard";
import posts from "@/mocks/post.json";

export default function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <div className="flex flex-col gap-6 w-full items-center">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} lang={params.lang} />
      ))}
    </div>
  );
}
