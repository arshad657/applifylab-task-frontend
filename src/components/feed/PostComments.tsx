"use client";

import { forwardRef, useState } from "react";
import { Smile, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "../shared/AuthContext";
import type { Comment } from "../types/feed";

export const CommentComposer = forwardRef<
  HTMLInputElement,
  { onSubmit: (content: string) => void }
>(function CommentComposer({ onSubmit }, ref) {
  const [value, setValue] = useState("");
  const { user } = useAuth();

  const avatarUrl = user?.avatarUrl || "https://i.pravatar.cc/150?img=12";
  const name = user ? `${user.firstName} ${user.lastName}` : "User";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatarUrl} alt="" />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 items-center gap-1 rounded-full bg-bg3 px-3 py-1.5">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a comment"
          aria-label="Write a comment"
          maxLength={500}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
        />
        <button
          type="button"
          aria-label="Add emoji"
          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
        >
          <Smile className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Attach file"
          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Send comment"
          className="flex h-7 w-7 items-center justify-center rounded-full text-primary hover:bg-secondary disabled:opacity-40 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
});

export function CommentList({
  comments,
  hiddenCount,
}: {
  comments: Comment[];
  hiddenCount?: number;
}) {
  if (comments.length === 0) return null;

  return (
    <div className="space-y-3">
      {!!hiddenCount && (
        <button
          type="button"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View {hiddenCount} previous comments
        </button>
      )}
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={comment.user.avatarUrl} alt="" />
            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 rounded-2xl bg-secondary/60 px-3.5 py-2.5">
            <p className="text-sm font-medium text-foreground">
              {comment.user.name}
            </p>
            <p className="text-sm text-muted-foreground">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
