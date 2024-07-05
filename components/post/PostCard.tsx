import { getDictionary } from "@/app/[lang]/dictionaries";
import PostCarousel from "@/components/post/PostCarousel";
import PostContent from "@/components/post/PostContent";
import PostDropdownMenu from "@/components/post/PostDropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Roboto } from "next/font/google";
import Link from "next/link";
import PostActions from "./PostActions";

interface PostCardProps {
  lang: string;
  post: {
    content: string;
    images: {
      url: string;
    }[];
    likes: number;
    comments: number;
    tags: string[];
    author: {
      id: string;
      name: string;
      alias: string;
      avatar: string;
      followers: number;
      following: boolean;
    };
    createdAt: string;
    liked: boolean;
  };
}

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

export default async function PostCard({ post, lang }: PostCardProps) {
  const dictionary = await getDictionary(lang);
  return (
    <Card className={`${roboto.className} max-w-[550px] w-full shadow-md`}>
      <CardHeader className="">
        <div className="flex justify-between">
          <Link href={`/${post.author.id}`} className="flex gap-2">
            <Avatar className="flex md:w-12 md:h-12 w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col font-bold">
              {post.author.name}
              <span className="text-sm font-normal">{`@${post.author.alias}`}</span>
            </div>
          </Link>
          <div className="flex justify-end">
            <PostDropdownMenu dict={dictionary.post.moreDropdown} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <PostContent
          dict={dictionary.post.content}
          content={post.content}
          tags={post.tags}
        />
        <PostCarousel images={post.images} />
      </CardContent>
      <CardFooter>
        <PostActions
          likes={post.likes}
          comments={post.comments}
          liked={post.liked}
        />
      </CardFooter>
    </Card>
  );
}
