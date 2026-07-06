"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { handleError } from "../../lib/handleError";
import { toast } from "sonner";
import { Post, Comment } from "../types/feed";
import { formatRelativeTime } from "../lib/utils";
import { AppDispatch } from "../../redux/store";
import {
  useGetFeedQuery,
  useAddPostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useAddCommentMutation,
  postsApi,
} from "../../redux/api/postsApi";

function mapBackendPostToPost(bp: any): Post {
  return {
    id: bp.id,
    author: {
      id: bp.author.id,
      name: `${bp.author.firstName} ${bp.author.lastName}`,
      avatarUrl: bp.author.avatarUrl || `https://i.pinimg.com/236x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t`,
      title: "Member",
    },
    postedAt: formatRelativeTime(bp.createdAt),
    isPublic: bp.isPublic,
    content: bp.text,
    imageUrl: bp.imageUrl,
    reactionCount: bp.likesCount,
    commentCount: bp.commentsCount,
    comments: [],
  };
}

function mapBackendCommentToComment(bc: any): Comment {
  return {
    id: bc.id,
    user: {
      id: bc.authorId,
      name: bc.author ? `${bc.author.firstName} ${bc.author.lastName}` : "User",
      avatarUrl: bc.author?.avatarUrl || `https://i.pinimg.com/236x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t`,
      title: "Member",
    },
    content: bc.text,
    postedAt: formatRelativeTime(bc.createdAt),
    likesCount: bc.likesCount,
    repliesCount: bc.repliesCount,
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

  const [addPostMutation] = useAddPostMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [addCommentMutation] = useAddCommentMutation();

  // Sync RTK Query state into local state
  useEffect(() => {
    if (feedResponse && feedResponse.status === "success") {
      const backendPosts = feedResponse.data || [];
      const mapped = backendPosts.map(mapBackendPostToPost);
      setPosts(mapped);

      const likedIds = backendPosts
        .filter((p: any) => p.isLIkedByUser)
        .map((p: any) => p.id);
      setLikedPostIds(likedIds);

      // Extract cursor and hasMore
      setNextCursor(feedResponse.meta?.pagination?.nextCursor || null);
      setHasMore(feedResponse.meta?.pagination?.hasMore || false);
    }
  }, [feedResponse]);

  const loadNextPage = useCallback(async () => {
    if (!hasMore || !nextCursor || isFetchingNext) return;

    try {
      setIsFetchingNext(true);
      const result = await dispatch(
        postsApi.endpoints.getFeed.initiate(
          { limit: 5, cursor: nextCursor },
          { forceRefetch: true }
        )
      ).unwrap();

      if (result && result.status === "success") {
        const newBackendPosts = result.data || [];
        const newMapped = newBackendPosts.map(mapBackendPostToPost);

        // Append posts
        setPosts((prev) => [...prev, ...newMapped]);

        // Append liked IDs
        const newLikedIds = newBackendPosts
          .filter((p: any) => p.isLIkedByUser)
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

  const addPost = useCallback(async (content: string, isPublic: boolean, imageUrl?: string) => {
    try {
      await addPostMutation({ text: content, isPublic, imageUrl }).unwrap();
      toast.success("Post created successfully!");
    } catch (err) {
      handleError(err);
    }
  }, [addPostMutation]);

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
      const response = await addCommentMutation({ postId, text }).unwrap();
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
  }, [addCommentMutation]);

  return {
    posts,
    likedPostIds,
    isLoading,
    hasMore,
    isFetchingNext,
    loadNextPage,
    addPost,
    toggleLike,
    addComment,
  };
}
