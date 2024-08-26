"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";
import {api} from "@/config/api";
import {Post} from "@/types/post";
import {User} from "@/types/user";
import Link from "next/link";
import {useState} from "react";
import EmojiPicker from "../emoji/EmojiPicker";
import HashTagPicker from "../HashTagPicker";
import {Icons} from "../Icons";
import ProfileAvatar from "../user/profile/ProfileAvatar";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {Separator} from "../ui/separator";
import {useToast} from "../ui/use-toast";
import PostScopeSelector from "./PostScopeSelector";

export default function CreatePostModal({
                                          user,
                                          dictionary,
                                        }: {
  user: User;
  dictionary: any;
}) {
  const [content, setContent] = useState<string | undefined>();
  const [medias, setMedias] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[] | undefined>();
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [postScope, setPostScope] = useState<"PUBLIC" | "PRIVATE">(user.setting?.status == "PRIVATE" ? "PRIVATE" : "PUBLIC");
  const [open, setOpen] = useState(false);
  const handleAddMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length + (medias?.length || 0) > 10) {
        alert(dictionary.createPost.alert.maxMedia);
      } else {
        setMedias(
          medias
            ? [...medias, ...Array.from(e.target.files)]
            : Array.from(e.target.files)
        );
        const filePreviews = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );
        setPreviews(previews ? [...previews, ...filePreviews] : filePreviews);
      }
      e.target.value = "";
    }
  };

  const handleRemoveMedia = (index: number) => {
    const newMedias = medias?.filter((_: any, i: number) => i !== index);
    setMedias(newMedias);
    if (previews) URL.revokeObjectURL(previews[index]);
    const newPreviews = previews?.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  const clearData = () => {
    setContent(undefined);
    setMedias([]);
    setPreviews(undefined);
    setHashTags([]);
  };

  const {toast} = useToast();

  const handleSubmitPost = async () => {
    const formData = new FormData();
    if (content) formData.append("content", content);
    formData.append("scope", postScope);
    if (medias)
      Array.from(medias).forEach((media) => {
        formData.append("medias", media);
      });
    if (hashTags)
      hashTags.forEach((tag) => {
        formData.append("tags", tag);
      });

    const post = await api.post<any, Post>("/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (post) {
      toast({
        title: dictionary.createPost.toast.title,
        description: dictionary.createPost.toast.description,
      });
      setOpen(false);
      clearData();
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setOpen(open);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <div
          className="flex gap-4 p-4 rounded-lg w-full 
              items-center hover:scale-105 hover:cursor-pointer"
        >
          <Icons.create className="w-6 h-6"/>
          <span className="hidden lg:flex items-center">
            {dictionary?.createPost.sidebarItem}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold justify-center">
            {dictionary?.createPost.title}
          </DialogTitle>
          <Separator/>
          <div className="flex items-center gap-2 pt-2">
            <ProfileAvatar src={user.profile.avatar} alt={user.profile.name}/>
            <div className="grid gap-0.5 w-full justify-items-start">
              <div className="font-medium">{user.profile.name}</div>
              <Link
                className="text-xs text-gray-500 dark:text-gray-400 hover:underline underline-offset-2"
                href={`/profile/${user.id}`}
                target="_blank"
              >
                {`@${user.profile.alias}`}
              </Link>
            </div>
            <PostScopeSelector 
              defaultValue={user.setting?.status == "PRIVATE" ? "PRIVATE" : "PUBLIC"} 
              onValueChange={(value) => setPostScope(value)} />
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="flex flex-col px-3 py-2 border rounded-xl focus:border-primary">
            <Textarea
              placeholder={dictionary?.createPost.contentPlaceholder}
              className="resize-none p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-0 h-auto"
              rows={3}
              maxLength={500}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="w-full flex justify-end gap-2 items-center">
              <div className="w-full flex gap-1">
                {hashTags?.map((hashTag, index: number) => (
                  <span
                    key={index}
                    className="text-primary text-sm hover:underline underline-offset-2 hover:cursor-pointer"
                  >
                    {`#${hashTag}`}
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {`${content?.length || 0}/500`}
              </span>
              <EmojiPicker
                text={""}
                setText={(emoji) => setContent((content || "") + emoji)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {previews?.map((preview, index) => (
              <div key={index} className="relative w-20 h-20">
                {medias[index].type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt="media"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : medias[index].type.startsWith("video/") ? (
                  <video
                    src={preview}
                    className="w-full h-full object-cover rounded-lg"
                    controls
                  />
                ) : null}
                <button
                  className="absolute top-0 right-0 p-1 bg-red-500 rounded-full border-2 border-white"
                  onClick={() => handleRemoveMedia(index)}
                >
                  <Icons.close className="w-3 h-3"/>
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Label
              htmlFor="image"
              className="p-2 border rounded-md hover:cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Icons.image className="h-5 w-5"/>
                {dictionary?.createPost.image}
              </span>
              <Input
                id="image"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleAddMedia}
              />
            </Label>
            <Label
              htmlFor="video"
              className="p-2 border rounded-md hover:cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Icons.video className="h-5 w-5"/>
                Video
              </span>
              <Input
                id="video"
                type="file"
                className="hidden"
                accept="video/*"
                max={10 - (medias?.length || 0)}
                multiple
                onChange={handleAddMedia}
              />
            </Label>
            <HashTagPicker
              trigger={
                <div className="p-2 border rounded-md hover:cursor-pointer">
                  <span className="flex items-center gap-1 text-sm">
                    <Icons.hashTag className="h-5 w-5"/>
                    Hashtag
                  </span>
                </div>
              }
              onPick={function (tag: string): void {
                !hashTags.includes(tag) && setHashTags([...hashTags, tag]);
              }}
            />

            <Label
              htmlFor="music"
              className="p-2 border rounded-md hover:cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Icons.music className="h-5 w-5"/>
                {dictionary?.createPost.music}
              </span>
              <Input
                id="music"
                type="file"
                className="hidden"
                accept="audio/*"
              />
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full text-white text-lg font-semibold"
            onClick={handleSubmitPost}
            disabled={
              !content &&
              (!medias || medias.length === 0) &&
              (!hashTags || hashTags.length === 0)
            }
          >
            {dictionary?.createPost.postButton}
          </Button>
        </DialogFooter>
      </DialogContent>
      <div></div>
    </Dialog>
  );
}
