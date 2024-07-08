"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "./Icons";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export default function CreatePostModal() {
  const attachs = [
    {
      name: "image",
      label: "Upload Image",
      icon: <Icons.image className="h-5 w-5" />,
      type: "file",
    },
    {
      name: "video",
      label: "Upload Video",
      icon: <Icons.video className="h-5 w-5" />,
      type: "file",
    },
    {
      name: "hashtag",
      label: "Hashtag",
      icon: <Icons.hashTag className="h-5 w-5" />,
      type: "text",
    },
    {
      name: "gif",
      label: "GIF",
      icon: <Icons.gif className="h-5 w-5" />,
      type: "file",
    },
    {
      name: "music",
      label: "Music",
      icon: <Icons.music className="h-5 w-5" />,
      type: "file",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex gap-4 p-4 rounded-lg w-full 
              items-center hover:scale-105 hover:cursor-pointer"
        >
          <Icons.create className="w-6 h-6" />
          <span className="hidden lg:flex items-center">Bài viết mới</span>
        </div>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold justify-center">
            Create Post
          </DialogTitle>
          <Separator />
          <div className="flex items-center gap-2 pt-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="font-medium">Cody Nolan</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                @codynolan
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="What's on your mind?"
            className="resize-none"
            rows={4}
            maxLength={500}
          />
          <div className="flex items-center gap-2 flex-wrap">
            {attachs.map((attach) => (
              <Label
                key={attach.name}
                htmlFor={attach.name}
                className="p-2 border rounded-md hover:cursor-pointer"
              >
                <span className="flex items-center gap-1">
                  {attach.icon}
                  {attach.label}
                </span>
                <Input id={attach.name} type={attach.type} className="hidden" />
              </Label>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose className="flex w-full" asChild>
            <Button className="w-full text-white text-lg font-semibold">
              Post
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <div></div>
    </Dialog>
  );
}
