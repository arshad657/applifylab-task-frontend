"use client";

import { forwardRef, useState } from "react";
import { useAuth } from "../shared/AuthContext";
import { Smile, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const CommentComposer = forwardRef<
  HTMLInputElement,
  { onSubmit: (content: string) => void }
>(

  function CommentComposer({ onSubmit }, ref) {
    const [value, setValue] = useState("");
    const { user } = useAuth();

    const avatarUrl = user?.avatarUrl || "https://i.pinimg.com/236x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t";
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

