"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { handleError } from "../../lib/handleError";
import { Post, Comment } from "../types/feed";
import { AppDispatch } from "../../redux/store";
import {
  useGetFeedQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useCreateCommentMutation,
  postsApi,
} from "../../redux/api/postsApi";

function mapBackendPostToPost(bp: any): Post {
  return {
    id: bp.id,
    author: {
      id: bp.author.id,
      name: `${bp.author.firstName} ${bp.author.lastName}`,
      avatarUrl: bp.author.avatarUrl || `https://i.pravatar.cc/150?img=12`,
      title: "Member",
    },
    postedAt: new Date(bp.createdAt).toLocaleDateString(),
    audience: bp.visibility === "PRIVATE" ? "Only me" : "Public",
    content: bp.text,
    imageUrl: bp.imageUrl
      ? bp.imageUrl.startsWith("http")
        ? bp.imageUrl
        : `http://localhost:4000${bp.imageUrl}`
      : undefined,
    reactionCount: bp.likesCount || 0,
    reactionAvatars: [],
    commentCount: bp.commentsCount || 0,
    shareCount: 0,
    comments: [],
  };
}

function mapBackendCommentToComment(bc: any): Comment {
  return {
    id: bc.id,
    user: {
      id: bc.authorId,
      name: bc.authorUsername,
      avatarUrl: bc.authorAvatarUrl || `https://i.pravatar.cc/150?img=12`,
      title: "Member",
    },
    content: bc.text,
    postedAt: new Date(bc.createdAt).toLocaleDateString(),
  };
}

export function useFeedPosts() {
  const dispatch = useDispatch<AppDispatch>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

  // Pagination state
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isFetchingNext, setIsFetchingNext] = useState(false);

  // Fetch feed via RTK Query (limit to 5 by default)
  const { data: feedResponse, isLoading } = useGetFeedQuery({ limit: 5 });

  const [createPost] = useCreatePostMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [createComment] = useCreateCommentMutation();

  // Sync RTK Query state into local state
  useEffect(() => {
    if (feedResponse && feedResponse.status === "success") {
      const backendPosts = feedResponse.data || [];
      const mapped = backendPosts.map(mapBackendPostToPost);
      setPosts(mapped);

      const likedIds = backendPosts
        .filter((p: any) => p.isLikedByMe)
        .map((p: any) => p.id);
      setLikedPostIds(likedIds);

      // Extract pagination details from meta
      setNextCursor(feedResponse.meta?.pagination?.nextCursor || null);
      setHasMore(feedResponse.meta?.pagination?.hasMore || false);
    }
  }, [feedResponse]);

  const loadNextPage = useCallback(async () => {
    if (!hasMore || isFetchingNext || !nextCursor) return;
    setIsFetchingNext(true);

    try {
      const result = await dispatch(
        postsApi.endpoints.getFeed.initiate({ cursor: nextCursor, limit: 5 }, { forceRefetch: true })
      ).unwrap();

      if (result.status === "success") {
        const newBackendPosts = result.data || [];
        const newMapped = newBackendPosts.map(mapBackendPostToPost);

        // Append posts
        setPosts((prev) => [...prev, ...newMapped]);

        // Append liked IDs
        const newLikedIds = newBackendPosts
          .filter((p: any) => p.isLikedByMe)
          .map((p: any) => p.id);
        setLikedPostIds((prev) => [...prev, ...newLikedIds]);

        // Update cursor and hasMore
        setNextCursor(result.meta?.pagination?.nextCursor || null);
        setHasMore(result.meta?.pagination?.hasMore || false);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsFetchingNext(false);
    }
  }, [dispatch, nextCursor, hasMore, isFetchingNext]);

  const addPost = useCallback(async (content: string) => {
    try {
      await createPost({ text: content, visibility: "PUBLIC" }).unwrap();
    } catch (err) {
      handleError(err);
    }
  }, [createPost]);

  const toggleLike = useCallback(async (postId: string) => {
    const isLiked = likedPostIds.includes(postId);

    // Optimistic UI updates
    setLikedPostIds((prev) =>
      isLiked ? prev.filter((id) => id !== postId) : [...prev, postId]
    );

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
            ...post,
            reactionCount: isLiked
              ? Math.max(0, post.reactionCount - 1)
              : post.reactionCount + 1,
          }
          : post
      )
    );

    try {
      if (isLiked) {
        await unlikePost(postId).unwrap();
      } else {
        await likePost(postId).unwrap();
      }
    } catch (err) {
      handleError(err);
      // Revert optimistic updates on failure
      setLikedPostIds((prev) =>
        isLiked ? [...prev, postId] : prev.filter((id) => id !== postId)
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
              ...post,
              reactionCount: isLiked
                ? post.reactionCount + 1
                : Math.max(0, post.reactionCount - 1),
            }
            : post
        )
      );
    }
  }, [likedPostIds, likePost, unlikePost]);

  const addComment = useCallback(async (postId: string, text: string) => {
    try {
      const response = await createComment({ postId, text }).unwrap();
      if (response.status === "success") {
        const newComment = mapBackendCommentToComment(response.data);

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
      }
    } catch (err) {
      handleError(err);
    }
  }, [createComment]);

  const loadComments = useCallback(async (postId: string) => {
    // try {
    //   const result = await dispatch(
    //     postsApi.endpoints.getComments.initiate(postId, { forceRefetch: true })
    //   ).unwrap();

    //   if (result.status === "success") {
    //     const backendComments = result.data || [];
    //     const mapped = backendComments.map(mapBackendCommentToComment);

    //     setPosts((prevPosts) =>
    //       prevPosts.map((post) =>
    //         post.id === postId ? { ...post, comments: mapped } : post
    //       )
    //     );
    //   }
    // } catch (err) {
    //   console.error(`Failed to load comments for post ${postId}:`, err);
    // }
  }, [dispatch]);

  return {
    posts,
    likedPostIds,
    isLoading,
    isFetchingNext,
    hasMore,
    addPost,
    toggleLike,
    addComment,
    loadComments,
    loadNextPage,
  };
}
