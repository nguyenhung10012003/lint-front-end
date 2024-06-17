import PostCard from "@/components/PostCard";
import posts from "@/mocks/post.json";

export default function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <div className="flex flex-col gap-6 w-full items-center lg:ml-[250px] sm:ml-[70px]">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} lang={params.lang} />
      ))}
    </div>
  );
}
