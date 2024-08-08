import { api } from "@/config/api";
import useMediaQuery from "@/hooks/use-media-query";
import { Comment } from "@/types/comment";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useCallback, useState } from "react";
import CommentForm from "../CommentForm";
import CommentList from "../CommentList";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";

export default function CommentModal({
  trigger,
  postId,
}: {
  trigger: React.ReactNode;
  postId: string;
}) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const fetchPerPage = 5;

  const loadMore = useCallback(async () => {
    const data = await api.get<any, Comment[]>(
      `/comment?postId=${postId}&skip=${
        page * fetchPerPage
      }&take=${fetchPerPage}&orderField=createdAt&orderDirection=desc`
    );
    if (!data || data.length === 0) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
    setComments([...comments, ...data]);
  }, [page]);
  //if (isLoading) return <Skeleton className="w-10 h-6"></Skeleton>;
  if (isMobile)
    return (
      <Drawer>
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent aria-describedby={undefined} className="h-full">
          <DrawerHeader className="p-2">
            <DialogTitle />
            <DrawerClose />
          </DrawerHeader>
          <div className="overflow-y-auto pb-2">
            <CommentList
              comments={comments}
              loadMore={loadMore}
              hasMore={hasMore}
            />
          </div>
          <div className="border-t-2 bottom-0 flex w-full p-2 bg-background">
            <CommentForm postId={postId} />
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent
        className="p-0 w-full max-w-[600px]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-center pt-4">Comments</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="px-0 overflow-y-auto pb-4 max-h-[70vh]">
          <CommentList
            comments={comments}
            loadMore={loadMore}
            hasMore={hasMore}
          />
        </div>
        <div className="border-t-2 bottom-0 flex w-full p-2 bg-background">
          <CommentForm
            postId={postId}
            submitAction="comment"
            mutate={(newComment: Comment) => {
              setComments([newComment, ...comments]);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
