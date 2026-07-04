"use client";

import { StoriesRow } from "./StoriesRow";
import { CreatePostBox } from "./CreatePostBox";
import { PostCard } from "./PostCard";
import { useFeedPosts } from "../hooks/useFeedPosts";

export function CenterFeed() {
  const { posts, likedPostIds, addPost, toggleLike, addComment } = useFeedPosts();

  return (
    <main className="custom-scrollbar scrollbar-hide min-w-0 min-h-0 h-full overflow-y-auto pb-6 pr-1.5">
      <StoriesRow />
      <CreatePostBox onSubmit={addPost} />
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          liked={likedPostIds.includes(post.id)}
          onToggleLike={toggleLike}
          onAddComment={addComment}
        />
      ))}
    </main>
  );
}
