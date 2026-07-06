"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Pencil, X, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "../shared/AuthContext";
import {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useGetLikersQuery,
} from "../../redux/api/postsApi";
import { handleError } from "../../lib/handleError";
import { cn } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

interface CommentsModalProps {
  postId: string;
  postAuthorId: string;
  postAuthorName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "Just now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString();
}

interface LikersModalProps {
  targetId: string | null;
  targetType: "POST" | "COMMENT";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LikersModal({ targetId, targetType, open, onOpenChange }: LikersModalProps) {
  const { data: response, isLoading } = useGetLikersQuery(
    { targetType, targetId: targetId || "" },
    { skip: !open || !targetId }
  );

  const likers = response?.data || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm w-full max-h-[60vh] flex flex-col p-0 gap-0 overflow-hidden bg-card">
        <DialogHeader className="border-b border-border px-6 py-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-md font-semibold text-foreground">Likes</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : likers.length === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center text-muted-foreground text-center">
              <p className="text-sm font-medium">No likes yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {likers.map((liker: any) => (
                <div key={liker.id} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={liker.avatarUrl || `https://i.pinimg.com/236x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t`} alt="" />
                    <AvatarFallback>{liker.firstName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {liker.firstName} {liker.lastName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CommentNodeProps {
  comment: any;
  repliesByParentId: Record<string, any[]>;
  postAuthorId: string;
  onReply: (comment: any) => void;
  depth?: number;
  likedCommentIds: string[];
  onToggleLike: (commentId: string) => void;
  onShowLikes: (commentId: string) => void;
}

function CommentNode({
  comment,
  repliesByParentId,
  postAuthorId,
  onReply,
  depth = 0,
  likedCommentIds,
  onToggleLike,
  onShowLikes,
}: CommentNodeProps) {
  const isPostAuthor = comment.user.id === postAuthorId;
  const replies = repliesByParentId[comment.id] || [];
  const isLiked = likedCommentIds.includes(comment.id);

  return (
    <div className="space-y-3">
      {/* Comment Body */}
      <div className="flex gap-3 items-start">
        <Avatar className={depth > 0 ? "h-7 w-7 mt-0.5" : "h-9 w-9 mt-0.5"}>
          <AvatarImage src={comment.user.avatarUrl} alt="" />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          {/* Comment Bubble Container */}
          <div className="relative inline-block max-w-full">
            {/* Comment Bubble */}
            <div className="rounded-[18px] bg-background dark:bg-secondary/25 px-4 py-2.5 inline-block max-w-full">
              {isPostAuthor && (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground/80 mb-0.5 select-none">
                  <Pencil className="h-3 w-3" />
                  <span>Author</span>
                </div>
              )}
              <p className="text-sm font-semibold text-foreground leading-tight">
                {comment.user.name}
              </p>
              <p className="mt-1 text-sm text-foreground/90 leading-normal whitespace-pre-wrap font-normal">
                {comment.content}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            {/* Buttons */}
            <div className="flex items-center gap-3.5 mt-1 px-2 text-[12px] font-semibold text-muted-foreground/80 select-none">
              <span>{comment.postedAt}</span>
              <button
                type="button"
                onClick={() => onToggleLike(comment.id)}
                className={cn(
                  "cursor-pointer hover:underline",
                  isLiked ? "text-primary font-bold animate-in zoom-in-95 duration-100" : "hover:text-foreground"
                )}
              >
                Like
              </button>
              <button
                type="button"
                onClick={() => onReply(comment)}
                className="cursor-pointer hover:underline hover:text-foreground"
              >
                Reply
              </button>

              {/* Reply Count */}
              {depth === 0 && comment.repliesCount > 0 && (
                <span className="text-muted-foreground/60 select-none">
                  &middot; {comment.repliesCount} reply{comment.repliesCount !== 1 ? "ies" : ""}
                </span>
              )}
            </div>

            {/* Like Count Badge */}
            {comment.likesCount > 0 && (
              <button
                type="button"
                onClick={() => onShowLikes(comment.id)}
                className="flex items-center gap-1 rounded-full bg-card border border-border px-1.5 py-0.5 shadow-sm text-[10px] text-muted-foreground select-none cursor-pointer hover:bg-secondary/40 transition-colors"
              >
                <ThumbsUp className="h-2.5 w-2.5 text-primary" fill="currentColor" />
                <span>{comment.likesCount}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Children replies rendered recursively */}
      {replies.length > 0 && (
        <div className="pl-9 space-y-3 border-l border-border/40 ml-[18px]">
          {replies.map((reply: any) => (
            <CommentNode
              key={reply.id}
              comment={reply}
              repliesByParentId={repliesByParentId}
              postAuthorId={postAuthorId}
              onReply={onReply}
              depth={depth + 1}
              likedCommentIds={likedCommentIds}
              onToggleLike={onToggleLike}
              onShowLikes={onShowLikes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentsModal({ postId, postAuthorId, postAuthorName, open, onOpenChange }: CommentsModalProps) {
  //States
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string } | null>(null);
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>([]);
  const [likersTarget, setLikersTarget] = useState<{ id: string; type: "POST" | "COMMENT" } | null>(null);

  //Query and Mutations
  const { data: response, isLoading } = useGetCommentsQuery(postId, { skip: !open });
  const [createComment, { isLoading: isSubmitting }] = useCreateCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();

  //Refs
  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of list when comments list changes
  useEffect(() => {
    if (response) {
      listEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  // Auto-focus input when replying state changes
  useEffect(() => {
    if (replyingTo) {
      inputRef.current?.focus();
    }
  }, [replyingTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;
    console.log("replying to: ", replyingTo);

    try {
      await createComment({
        postId,
        text: commentText,
        parentId: replyingTo?.id ?? undefined
      }).unwrap();
      setCommentText("");
      setReplyingTo(null);
    } catch (err) {
      handleError(err);
    }
  };

  const handleToggleLikeComment = async (commentId: string) => {
    const isLiked = likedCommentIds.includes(commentId);
    try {
      if (isLiked) {
        setLikedCommentIds((prev) => prev.filter((id) => id !== commentId));
        await unlikeComment({ commentId, postId }).unwrap();
      } else {
        setLikedCommentIds((prev) => [...prev, commentId]);
        await likeComment({ commentId, postId }).unwrap();
      }
    } catch (err) {
      handleError(err);
      // Revert optimistic state changes on error
      if (isLiked) {
        setLikedCommentIds((prev) => [...prev, commentId]);
      } else {
        setLikedCommentIds((prev) => prev.filter((id) => id !== commentId));
      }
    }
  };

  const rawComments = response?.data || [];

  const comments = rawComments.map((bc: any) => ({
    id: bc.id,
    user: {
      id: bc.authorId,
      name: bc.authorUsername,
      avatarUrl: bc.authorAvatarUrl || `https://i.pinimg.com/236x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t`,
      title: "Member",
    },
    content: bc.text,
    parentId: bc.parentId,
    postedAt: formatRelativeTime(bc.createdAt),
    likesCount: bc.likesCount || 0,
    repliesCount: bc.repliesCount || 0,
  }));

  // Separate top-level comments and replies
  const topLevelComments = comments.filter((c: any) => !c.parentId);
  const repliesByParentId: Record<string, any[]> = {};
  comments.forEach((c: any) => {
    if (c.parentId) {
      if (!repliesByParentId[c.parentId]) {
        repliesByParentId[c.parentId] = [];
      }
      repliesByParentId[c.parentId].push(c);
    }
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl w-full h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-card">
          {/* Header */}
          <DialogHeader className="border-b border-border px-6 py-4 flex flex-col items-start gap-1">
            <DialogTitle className="text-lg font-semibold text-foreground">{postAuthorName}'s Post</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-0">
              {topLevelComments.length} comment{topLevelComments.length !== 1 ? "s" : ""}
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Comments List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : topLevelComments.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-muted-foreground text-center">
                <p className="text-sm font-medium">No comments yet.</p>
                <p className="text-xs">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topLevelComments.map((comment: any) => (
                  <CommentNode
                    key={comment.id}
                    comment={comment}
                    repliesByParentId={repliesByParentId}
                    postAuthorId={postAuthorId}
                    likedCommentIds={likedCommentIds}
                    onToggleLike={handleToggleLikeComment}
                    onShowLikes={(commentId) => setLikersTarget({ id: commentId, type: "COMMENT" })}
                    onReply={(targetComment) => setReplyingTo({ id: targetComment.id, name: targetComment.user.name })}
                  />
                ))}
                <div ref={listEndRef} />
              </div>
            )}
          </div>

          {/* Reply Indicator */}
          {replyingTo && (
            <div className="flex items-center justify-between bg-muted/40 px-6 py-2 border-t border-border text-xs text-muted-foreground animate-in slide-in-from-bottom-2 duration-150">
              <span className="font-medium">
                Replying to <span className="text-foreground font-semibold">@{replyingTo.name}</span>
              </span>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="text-muted-foreground hover:text-foreground p-0.5 rounded transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Composer Form */}
          <div className="border-t border-background bg-card px-6 py-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatarUrl || "https://i.pinimg.com/236x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t"} alt="" />
                <AvatarFallback>{(user?.firstName || "U").charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 items-center gap-1 rounded-full bg-bg3 px-4 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={replyingTo ? `Reply to ${replyingTo.name}...` : "Write a comment..."}
                  aria-label="Write a comment"
                  maxLength={500}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim() || isSubmitting}
                  aria-label="Send comment"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-secondary disabled:opacity-40 transition-colors"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <LikersModal
        targetId={likersTarget?.id || null}
        targetType={likersTarget?.type || "COMMENT"}
        open={!!likersTarget}
        onOpenChange={(open) => {
          if (!open) setLikersTarget(null);
        }}
      />
    </>
  );
}
