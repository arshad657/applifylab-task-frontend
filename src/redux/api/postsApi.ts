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
    createComment: builder.mutation<any, { postId: string; text: string }>({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
        "Post",
      ],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useCreateCommentMutation,
} = postsApi;
