import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import Image from "next/image";
import { cn } from "../lib/utils";

export function PostReactionSummary({
  reactionCount,
  commentCount,
  onCommentClick,
  onReactionClick,
}: {
  reactionCount: number;
  commentCount: number;
  onCommentClick?: () => void;
  onReactionClick?: () => void;
}) {
  if (reactionCount === 0 && commentCount === 0) return null;

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      {reactionCount > 0 ? (
        <button
          type="button"
          onClick={onReactionClick}
          className="hover:underline text-muted-foreground focus:outline-none cursor-pointer font-medium"
        >
          {reactionCount} {reactionCount === 1 ? "like" : "likes"}
        </button>
      ) : (
        <span />
      )}
      <div className="flex gap-4">
        {commentCount > 0 && (
          <button
            type="button"
            onClick={onCommentClick}
            className="hover:underline text-muted-foreground focus:outline-none cursor-pointer"
          >
            {commentCount} comments
          </button>
        )}
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
    <div className="grid grid-cols-3 border-y border-gray-300 py-1 text-sm font-medium">
      <button
        type="button"
        onClick={onToggleLike}
        aria-pressed={liked}
        className={cn(
          "flex items-center justify-center gap-2 rounded-lg py-2 transition-colors hover:bg-color10 cursor-pointer",
          liked ? "text-primary bg-color10" : "text-muted-foreground"
        )}
      >
        <ThumbsUp className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
        {liked ? "Liked" : "Like"}
      </button>
      <button
        type="button"
        onClick={onFocusComment}
        className="flex items-center justify-center gap-2 rounded-lg py-2 text-muted-foreground transition-colors hover:bg-color10 cursor-pointer"
      >
        <MessageSquare className="h-4 w-4" />
        Comment
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg py-2 text-gray-300 transition-colors !cursor-not-allowed"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}
