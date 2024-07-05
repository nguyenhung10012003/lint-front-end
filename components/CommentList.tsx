import { Separator } from "@/components/ui/separator";
import comments from "@/mocks/comment.json";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default function CommentList() {
  return (
    <div className="flex gap-4 flex-col">
      {comments.map((comment, index) => (
        <div key={comment.id} className="flex flex-col gap-4">
          <Comment comment={comment} />
          <CommentForm />
          {index < comments.length - 1 && <Separator className="" />}
        </div>
      ))}
    </div>
  );
}
