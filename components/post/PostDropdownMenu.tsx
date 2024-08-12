"use client";
import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/config/api";
import { Post } from "@/types/post";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { useCookies } from "next-client-cookies";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "../ui/use-toast";

export default function dictDropdownMenu({
  dict,
  post,
}: {
  dict: {
    savePost: string;
    reportPost: string;
    turnOffNotification: string;
    hidePost: string;
    deletePost: string;
    editPost: string;
  };
  post: Post;
}) {
  const dropdownItemClassname =
    "flex gap-2 items-center p-2 hover:bg-primary-foreground rounded-md hover:cursor-pointer text-sm";
  const dropdownGroups = [
    {
      name: "save",
      items: [
        {
          component: (
            <div className={dropdownItemClassname}>
              <Icons.save className="h-6 w-6" />
              <span>{dict.savePost}</span>
            </div>
          ),
        },
      ],
    },
    {
      name: "report",
      items: [
        {
          component: (
            <div className={dropdownItemClassname}>
              <Icons.report className="h-6 w-6" />
              <span>{dict.reportPost}</span>
            </div>
          ),
        },
      ],
    },
    {
      name: "other",
      items: [
        {
          component: (
            <div className={dropdownItemClassname}>
              <Icons.turnOffNotification className="h-6 w-6" />
              <span>{dict.turnOffNotification}</span>
            </div>
          ),
        },
        {
          component: (
            <div className={dropdownItemClassname}>
              <Icons.hide className="h-6 w-6" />
              <span>{dict.hidePost}</span>
            </div>
          ),
        },
      ],
    },
  ];
  const cookies = useCookies();
  const isAuthor = post.userId === cookies.get("userId");
  if (isAuthor) {
    dropdownGroups.push({
      name: "author",
      items: [
        {
          component: (
            <div className={dropdownItemClassname}>
              <Icons.edit className="h-6 w-6" />
              <span>{dict.editPost}</span>
            </div>
          ),
        },
        {
          component: (
            <AlertDialog>
              <AlertDialogTrigger>
                <div className={dropdownItemClassname}>
                  <Icons.delete className="h-6 w-6" />
                  <span>{dict.deletePost}</span>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolute sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your post and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border py-1 px-2 h-10 rounded-md bg-background hover:bg-accent hover:text-accent-foreground">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-primary text-white hover:bg-primary/90 py-1 px-2 h-10 rounded-md"
                    onClick={async () => {
                      try {
                        await api.delete(`/post/${post.id}`);
                        toast({
                          title: "Post deleted",
                          description:
                            "Your post has been deleted successfully.",
                        });
                        window.location.reload();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Yes, delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
        },
      ],
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.more className="h-10 w-10 p-2 rounded-full hover:bg-primary-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownGroups.map((group, index) => (
          <div key={index}>
            {index !== 0 && <DropdownMenuSeparator className="bg-gray-200" />}
            <DropdownMenuGroup className="flex flex-col gap-1">
              {group.items.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  {item.component}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
