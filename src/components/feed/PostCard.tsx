"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FeedPanel } from "./FeedPanel";
import { PostMenu } from "./PostMenu";
import { PostActionRow, PostReactionSummary } from "./PostReactions";
import { CommentComposer } from "./PostComments";
import { useAuth } from "../shared/AuthContext";
import type { Post } from "../types/feed";
import { CommentsModal, LikersModal } from "./CommentsModal";

export function PostCard({
  post,
  liked,
  onToggleLike,
  onAddComment,
}: {
  post: Post;
  liked: boolean;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
}) {
  const { user } = useAuth();

  const commentInputRef = useRef<HTMLInputElement>(null);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isLikersModalOpen, setIsLikersModalOpen] = useState(false);


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
              <p className="text-xs ">
                {post.postedAt} &middot; <span className={!post.isPublic ? "text-red-500" : "text-muted-foreground"}> {post.isPublic ? "Public" : "Only me"}</span>
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
              unoptimized={post.imageUrl.includes("localhost")}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <PostReactionSummary
          reactionCount={post.reactionCount}
          commentCount={post.commentCount}
          onCommentClick={() => setIsCommentsModalOpen(true)}
          onReactionClick={() => setIsLikersModalOpen(true)}
        />

        <PostActionRow
          liked={liked}
          onToggleLike={() => onToggleLike(post.id)}
          onFocusComment={() => setIsCommentsModalOpen(true)}
        />

        <div className="space-y-4">
          <CommentComposer
            ref={commentInputRef}
            onSubmit={(content: any) => onAddComment(post.id, content)}
          />
        </div>
      </div>

      <CommentsModal
        postId={post.id}
        postAuthorId={post.author.id}
        postAuthorName={post.author.name}
        open={isCommentsModalOpen}
        onOpenChange={setIsCommentsModalOpen}
      />

      <LikersModal
        targetId={post.id}
        targetType="POST"
        open={isLikersModalOpen}
        onOpenChange={setIsLikersModalOpen}
      />
    </FeedPanel>
  );
}
