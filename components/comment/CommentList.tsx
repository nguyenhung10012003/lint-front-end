import {Comment} from "@/types/comment";
import CommentCard from "./CommentCard";
import InfiniteScroll from "../InfiniteScroll";

export default function CommentList({
                                      comments,
                                      loadMore,
                                      hasMore,
                                    }: {
  comments: Comment[];
  loadMore: () => void;
  hasMore: boolean;
}) {
  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMore}
      className="flex flex-col gap-3"
    >
      {comments.map((comment, index) => (
        <div key={index}>
          <CommentCard key={index} comment={comment}/>
          {index !== comments.length - 1 && <hr/>}
        </div>
      ))}
    </InfiniteScroll>
  );
}
