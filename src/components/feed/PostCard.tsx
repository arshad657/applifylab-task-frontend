"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FeedPanel } from "./FeedPanel";
import { PostMenu } from "./PostMenu";
import { PostActionRow, PostReactionSummary } from "./PostReactions";
import { CommentComposer, CommentList } from "./PostComments";
import { useAuth } from "../shared/AuthContext";
import type { Post } from "../types/feed";
import { CommentsModal } from "./CommentsModal";

export function PostCard({
  post,
  liked,
  onToggleLike,
  onAddComment,
  onLoadComments,
}: {
  post: Post;
  liked: boolean;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onLoadComments: (postId: string) => void;
}) {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

  useEffect(() => {
    onLoadComments(post.id);
  }, [post.id, onLoadComments]);


  return (
    <FeedPanel className="mb-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar className="h-11 w-11">
              <AvatarImage src={post.author.avatarUrl} alt="" />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {post.author.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {post.postedAt} &middot; {post.audience}
              </p>
            </div>
          </div>
          <PostMenu isOwner={post.author.id === user?.id} />
        </div>

        {post.content && (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {post.content}
          </p>
        )}

        {post.imageUrl && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
            <Image
              src={post.imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <PostReactionSummary
          reactionCount={post.reactionCount}
          reactionAvatars={post.reactionAvatars}
          commentCount={post.commentCount}
          shareCount={post.shareCount}
          onCommentClick={() => setIsCommentsModalOpen(true)}
        />

        <PostActionRow
          liked={liked}
          onToggleLike={() => onToggleLike(post.id)}
          onFocusComment={() => setIsCommentsModalOpen(true)}
        />

        <div className="space-y-4 border-t border-border pt-4">
          <CommentComposer
            ref={commentInputRef}
            onSubmit={(content) => onAddComment(post.id, content)}
          />
          <CommentList comments={post.comments} hiddenCount={post.hiddenCommentCount} />
        </div>
      </div>

      <CommentsModal
        postId={post.id}
        postAuthorId={post.author.id}
        postAuthorName={post.author.name}
        open={isCommentsModalOpen}
        onOpenChange={setIsCommentsModalOpen}
      />
    </FeedPanel>
  );
}
