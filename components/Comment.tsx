import comments from "@/mocks/comment.json";
import CommentCard from "./CommentCard";

export default function Comment({
  comment,
}: {
  comment: (typeof comments)[0];
}) {
  return (
    <>
      <CommentCard key={comment.id} comment={comment} />
      {comment.replies && (
        <div className="flex flex-col gap-2 ml-12">
          {comment.replies.map((reply, index) => (
            <CommentCard key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </>
  );
}
