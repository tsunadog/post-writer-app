"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icon } from "./icon";
import { useState } from "react";
import { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface PostCreateButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    const response = await fetch("api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      return toast({
        title: "問題が発生しました。",
        description: "投稿の作成に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }

    const post = await response.json();

    router.refresh();
    router.push(`editor/${post.id}`);
  };

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        { "cursor-not-allowed opacity-60": isLoading },
        className
      )}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Icon.spinner className="animate-spin" /> : <Icon.add />}
      新しい投稿
    </button>
  );
}
