import { baseApi } from "./baseApi";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeed: builder.query<any, { limit?: number; cursor?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.cursor) queryParams.append("cursor", params.cursor);
        const qStr = queryParams.toString();
        return `/posts/get-all${qStr ? `?${qStr}` : ""}`;
      },
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<any, { text: string; isPublic: boolean; imageUrl?: string }>({
      query: (body) => ({
        url: "/posts/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    uploadImage: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/posts/upload",
        method: "POST",
        body: formData,
      }),
    }),
    likePost: builder.mutation<any, string>({
      query: (postId) => ({
        url: `/post/${postId}/like-unlike`,
        method: "POST",
        body: { like: true },
      }),
      invalidatesTags: ["Post"],
    }),
    unlikePost: builder.mutation<any, string>({
      query: (postId) => ({
        url: `/post/${postId}/like-unlike`,
        method: "POST",
        body: { like: false },
      }),
      invalidatesTags: ["Post"],
    }),
    addComment: builder.mutation<any, { postId: string; text: string; parentId?: string }>({
      query: ({ postId, text, parentId }) => ({
        url: "/post/add-comment",
        method: "POST",
        body: { postId, text, parentId },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
        "Post",
      ],
    }),
    getComments: builder.query<any, string>({
      query: (postId) => `/post/${postId}/get-comments`,
      providesTags: (result, error, postId) => [{ type: "Comment", id: postId }],
    }),
    likeComment: builder.mutation<any, { commentId: string; postId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}/like-unlike`,
        method: "POST",
        body: { like: true },
      }),
      async onQueryStarted({ commentId, postId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getComments", postId, (draft) => {
            if (draft && draft.data) {
              const comment = draft.data.find((c: any) => c.id === commentId);
              if (comment) {
                comment.likesCount = (comment.likesCount || 0) + 1;
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
      ],
    }),
    unlikeComment: builder.mutation<any, { commentId: string; postId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}/like-unlike`,
        method: "POST",
        body: { like: false },
      }),
      async onQueryStarted({ commentId, postId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getComments", postId, (draft) => {
            if (draft && draft.data) {
              const comment = draft.data.find((c: any) => c.id === commentId);
              if (comment) {
                comment.likesCount = Math.max(0, (comment.likesCount || 0) - 1);
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ({ postId }) => [
        { type: "Comment", id: postId },
        "Likers"
      ],
    }),
    getLikers: builder.query<any, { targetType: "POST" | "COMMENT"; targetId: string }>({
      query: ({ targetType, targetId }) =>
        targetType === "POST"
          ? `/post/${targetId}/get-likes`
          : `/comments/${targetId}/get-likes`,
      providesTags: ["Likers"],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useAddPostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useGetLikersQuery,
  useUploadImageMutation,
} = postsApi;
