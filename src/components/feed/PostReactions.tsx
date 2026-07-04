import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import Image from "next/image";
import { cn } from "../lib/utils";

export function PostReactionSummary({
  reactionCount,
  reactionAvatars,
  commentCount,
  shareCount,
}: {
  reactionCount: number;
  reactionAvatars: string[];
  commentCount: number;
  shareCount: number;
}) {
  if (reactionCount === 0 && commentCount === 0 && shareCount === 0) return null;

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      {reactionCount > 0 ? (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {reactionAvatars.slice(0, 3).map((src, i) => (
              <span
                key={i}
                className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-card"
              >
                <Image src={src} alt="" fill sizes="20px" className="object-cover" />
              </span>
            ))}
          </div>
          <span>{reactionCount}</span>
        </div>
      ) : (
        <span />
      )}
      <div className="flex gap-4">
        {commentCount > 0 && <span>{commentCount} comments</span>}
        {shareCount > 0 && <span>{shareCount} shares</span>}
      </div>
    </div>
  );
}

export function PostActionRow({
  liked,
  onToggleLike,
  onFocusComment,
}: {
  liked: boolean;
  onToggleLike: () => void;
  onFocusComment: () => void;
}) {
  return (
    <div className="grid grid-cols-3 border-t border-border pt-1 text-sm font-medium">
      <button
        type="button"
        onClick={onToggleLike}
        aria-pressed={liked}
        className={cn(
          "flex items-center justify-center gap-2 rounded-lg py-2 transition-colors hover:bg-secondary",
          liked ? "text-primary" : "text-muted-foreground"
        )}
      >
        <ThumbsUp className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
        Like
      </button>
      <button
        type="button"
        onClick={onFocusComment}
        className="flex items-center justify-center gap-2 rounded-lg py-2 text-muted-foreground transition-colors hover:bg-secondary"
      >
        <MessageSquare className="h-4 w-4" />
        Comment
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg py-2 text-muted-foreground transition-colors hover:bg-secondary"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}
