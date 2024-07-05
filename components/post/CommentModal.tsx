import useMediaQuery from "@/hooks/use-media-query";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
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
}: {
  trigger: React.ReactNode;
}) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile)
    return (
      <Drawer>
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent aria-describedby={undefined} className="h-full">
          <DrawerHeader className="p-2">
            <DialogTitle />
            <DrawerClose />
          </DrawerHeader>
          <div className="px-4 overflow-y-auto pb-20">
            <CommentList />
          </div>
          <div className="border-t-2 fixed bottom-0 flex w-full p-2 bg-background">
            <CommentForm />
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-2">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="px-4 overflow-y-auto pb-28 max-h-[70vh]">
          <CommentList />
        </div>
        <div className="border-t-2 absolute bottom-0 flex w-full p-2 bg-background">
          <CommentForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
