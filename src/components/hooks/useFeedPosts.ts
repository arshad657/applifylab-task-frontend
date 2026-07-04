"use client";

import { useState } from "react";
import { Post, Comment } from "../types/feed";
import { posts as initialPosts, currentUser } from "../lib/mock/feedData";

export function useFeedPosts() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

  const addPost = (content: string, image?: File | string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: currentUser,
      postedAt: "Just now",
      audience: "Public",
      content,
      imageUrl: typeof image === "string" ? image : undefined,
      reactionCount: 0,
      reactionAvatars: [],
      commentCount: 0,
      shareCount: 0,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLike = (postId: string) => {
    setLikedPostIds((prev) => {
      const isLiked = prev.includes(postId);
      if (isLiked) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  reactionCount: Math.max(0, post.reactionCount - 1),
                  reactionAvatars: post.reactionAvatars.filter(
                    (avatar) => avatar !== currentUser.avatarUrl
                  ),
                }
              : post
          )
        );
        return prev.filter((id) => id !== postId);
      } else {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  reactionCount: post.reactionCount + 1,
                  reactionAvatars: [...post.reactionAvatars, currentUser.avatarUrl],
                }
              : post
          )
        );
        return [...prev, postId];
      }
    });
  };

  const addComment = (postId: string, text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: currentUser,
      content: text,
      postedAt: "Just now",
    };
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentCount: post.commentCount + 1,
              comments: [...post.comments, newComment],
            }
          : post
      )
    );
  };

  return {
    posts,
    likedPostIds,
    addPost,
    toggleLike,
    addComment,
  };
}
