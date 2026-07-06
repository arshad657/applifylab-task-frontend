"use client";

import { StoriesRow } from "./StoriesRow";
import { CreatePostBox } from "./CreatePostBox";
import { PostCard } from "./PostCard";
import { useFeedPosts } from "../hooks/useFeedPosts";
import { Newspaper } from "lucide-react";

export function CenterFeed() {
  const {
    posts,
    likedPostIds,
    isFetchingNext,
    hasMore,
    addPost,
    toggleLike,
    addComment,
    loadNextPage,
  } = useFeedPosts();

  console.log("hasMore: ", hasMore)


  return (
    <main className="custom-scrollbar scrollbar-hide min-w-0 min-h-0 h-full overflow-y-auto pb-6 pr-1.5">
      <StoriesRow />
      <CreatePostBox onSubmit={addPost} />

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/50 text-primary border border-gray-300">
            <Newspaper className="h-8 w-8 text-primary/80" />
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              !
            </div>
          </div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">Your feed is empty</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
            There are no posts to display right now. Share your thoughts or photos above to start the conversation!
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            liked={likedPostIds.includes(post.id)}
            onToggleLike={toggleLike}
            onAddComment={addComment}
          />
        ))
      )}

      {hasMore && (
        <div className="flex justify-center py-6">
          <button
            type="button"
            onClick={loadNextPage}
            disabled={isFetchingNext}
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-sm hover:shadow transition disabled:opacity-50 flex items-center gap-2"
          >
            {isFetchingNext ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Loading...
              </>
            ) : (
              "Show More"
            )}
          </button>
        </div>
      )}
    </main>
  );
}
