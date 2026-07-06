import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<any, any>({
      query: (body = {}) => ({
        url: "/auth/logout",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query<any, string>({
      query: (username) => `/users/${username}`,
    }),
    refresh: builder.mutation<any, { refreshToken: string } | void>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),
    updateProfile: builder.mutation<any, { bio?: string; avatarUrl?: string }>({
      query: (body) => ({
        url: "/users/me",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useRefreshMutation,
  useUpdateProfileMutation,
} = authApi;
