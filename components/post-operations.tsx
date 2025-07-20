"use client";

import { Post } from "@/generated/prisma";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icon } from "./icon";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

async function deletePost(postId: string) {
  try {
    const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Failed");
    }
    return true;
  } catch (err) {
    toast({
      title: "問題が発生しました。",
      description: "記事の削除ができませんでした。もう一度お試しください。",
      variant: "destructive",
    });
  }
}

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">;
}

export default function PostOperations({ post }: PostOperationsProps) {
  const router = useRouter();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon.ellipsis className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/editor/${post.id}`} className="w-full">
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive cursor-pointer focus:text-destructive"
            onClick={() => setShowDeleteAlert(true)}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>この記事を削除します</AlertDialogTitle>
            <AlertDialogDescription>
              削除した記事は元に戻せません。よろしいですか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              className={cn(buttonVariants({ variant: "destructive" }))}
              onClick={async (e) => {
                e.preventDefault();
                setIsDeleteLoading(true);
                const deleted = await deletePost(post.id);

                if (deleted) {
                  setShowDeleteAlert(false);
                  setIsDeleteLoading(false);
                  router.refresh();
                }
              }}
            >
              {isDeleteLoading ? (
                <Icon.spinner className="w-4 h-4 animate-spin" />
              ) : (
                <Icon.trash className="w-4 h-4" />
              )}
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
