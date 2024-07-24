import Link from "next/link";

export default function Hashtag({ tag }: { tag: string }) {
  return (
    <Link
      href={{
        pathname: "/search",
        query: {
          tags: [tag],
        },
      }}
      className="text-sm text-blue-500 hover:underline hover:cursor-pointer"
    >
      {`#${tag}`}
    </Link>
  );
}
