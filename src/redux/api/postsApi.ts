import { baseApi } from "./baseApi";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeed: builder.query<any, { limit?: number; cursor?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.cursor) queryParams.append("cursor", params.cursor);
        const qStr = queryParams.toString();
        return `/feed/public${qStr ? `?${qStr}` : ""}`;
      },
      providesTags: ["Post"],
    }),
    createPost: builder.mutation<any, { text: string; visibility: string }>({
      query: (body) => ({
        url: "/posts/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation<any, string>({
      query: (postId) => ({
        url: `/likes/POST/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    unlikePost: builder.mutation<any, string>({
      query: (postId) => ({
        url: `/likes/POST/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    createComment: builder.mutation<any, { postId: string; text: string; parentId?: string }>({
      query: ({ postId, text, parentId }) => ({
        url: "/post/create-comment",
        method: "POST",
        body: { postId, text, parentId },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
        "Post",
      ],
    }),
    getComments: builder.query<any, string>({
      query: (postId) => `/post/${postId}/comments`,
      providesTags: (result, error, postId) => [{ type: "Comment", id: postId }],
    }),
    likeComment: builder.mutation<any, { commentId: string; postId: string }>({
      query: ({ commentId }) => ({
        url: `/likes/COMMENT/${commentId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
      ],
    }),
    unlikeComment: builder.mutation<any, { commentId: string; postId: string }>({
      query: ({ commentId }) => ({
        url: `/likes/COMMENT/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
      ],
    }),
    getLikers: builder.query<any, { targetType: "POST" | "COMMENT"; targetId: string }>({
      query: ({ targetType, targetId }) => `/likes/${targetType}/${targetId}/users`,
    }),
  }),
});

export const {
  useGetFeedQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useGetLikersQuery,
} = postsApi;
