"use client";

import { useState } from "react";
import { Image as ImageIcon, Video, CalendarDays, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FeedPanel } from "./FeedPanel";
import { currentUser } from "../lib/mock/feedData";

const ATTACHMENTS = [
  { id: "photo", label: "Photo", icon: ImageIcon, color: "text-emerald-500" },
  { id: "video", label: "Video", icon: Video, color: "text-rose-500" },
  { id: "event", label: "Event", icon: CalendarDays, color: "text-amber-500" },
  { id: "article", label: "Article", icon: FileText, color: "text-sky-500" },
] as const;

export function CreatePostBox({
  onSubmit,
}: {
  onSubmit: (content: string) => void;
}) {
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  }

  return (
    <FeedPanel className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={currentUser.avatarUrl} alt="" />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
            aria-label="Write a post"
            maxLength={2000}
            className="min-h-[44px]"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {ATTACHMENTS.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
              >
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <Button type="submit" size="sm" disabled={!content.trim()}>
            Post
          </Button>
        </div>
      </form>
    </FeedPanel>
  );
}
