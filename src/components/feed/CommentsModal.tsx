"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "../shared/AuthContext";
import { useGetCommentsQuery, useCreateCommentMutation } from "../../redux/api/postsApi";
import { handleError } from "../../lib/handleError";
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

export function CommentsModal({ postId, postAuthorId, postAuthorName, open, onOpenChange }: CommentsModalProps) {
  const { user } = useAuth();
  const { data: response, isLoading } = useGetCommentsQuery(postId, { skip: !open });
  const [createComment, { isLoading: isSubmitting }] = useCreateCommentMutation();
  const [commentText, setCommentText] = useState("");
  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of list when comments list changes
  useEffect(() => {
    if (response) {
      listEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    try {
      await createComment({ postId, text: commentText }).unwrap();
      setCommentText("");
    } catch (err) {
      handleError(err);
    }
  };

  const rawComments = response?.data || [];

  const comments = rawComments.map((bc: any) => ({
    id: bc.id,
    user: {
      id: bc.authorId,
      name: bc.authorUsername,
      avatarUrl: bc.authorAvatarUrl || `https://i.pravatar.cc/150?img=12`,
      title: "Member",
    },
    content: bc.text,
    postedAt: formatRelativeTime(bc.createdAt),
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-full h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-card">
        {/* Header */}
        <DialogHeader className="border-b border-border px-6 py-4 flex flex-col items-start gap-1">
          <DialogTitle className="text-lg font-semibold text-foreground">{postAuthorName}'s Post</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-0">
            {comments.length} comment{comments.length !== 1 ? "s" : ""}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Comments List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : comments.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground text-center">
              <p className="text-sm font-medium">No comments yet.</p>
              <p className="text-xs">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: any) => {
                const isPostAuthor = comment.user.id === postAuthorId;
                return (
                  <div key={comment.id} className="flex gap-3 items-start">
                    <Avatar className="h-9 w-9 mt-0.5">
                      <AvatarImage src={comment.user.avatarUrl} alt="" />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      {/* Comment Bubble */}
                      <div className="rounded-[18px] bg-background dark:bg-background px-4 py-2.5 inline-block max-w-full">
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

                      {/* Action Row */}
                      <div className="flex items-center gap-3.5 mt-1 px-2 text-[12px] font-semibold text-muted-foreground/80 select-none">
                        <span>{comment.postedAt}</span>
                        <button type="button" className="cursor-pointer hover:underline hover:text-foreground">
                          Like
                        </button>
                        <button type="button" className="cursor-pointer hover:underline hover:text-foreground">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={listEndRef} />
            </div>
          )}
        </div>

        {/* Composer Form */}
        <div className="border-t border-background bg-card px-6 py-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatarUrl || "https://i.pravatar.cc/150?img=12"} alt="" />
              <AvatarFallback>{(user?.firstName || "U").charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 items-center gap-1 rounded-full bg-bg3 px-4 py-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                aria-label="Write a comment"
                maxLength={500}
                className="flex-1 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
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
  );
}
