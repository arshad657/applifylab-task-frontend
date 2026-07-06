import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setCredentials, clearCredentials } from "../authSlice";
import { RootState } from "../store";
import { getRefreshTokenCookie, setRefreshTokenCookie } from "@/src/lib/token";

const API_BASE_URL = "http://localhost:4000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

let refreshPromise: Promise<string | null> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const isAuthCall = typeof args === "string"
    ? args.startsWith("/auth/")
    : args.url?.startsWith("/auth/");

  if (result.error && result.error.status === 401 && !isAuthCall) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const rfToken = getRefreshTokenCookie();
          if (!rfToken) {
            throw new Error("No refresh token in cookies");
          }

          const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: rfToken }),
          });

          if (!refreshRes.ok) {
            throw new Error("Refresh failed");
          }

          const json = await refreshRes.json();
          if (json.status !== "success") {
            throw new Error("Refresh status error");
          }

          const newAccessToken = json.data?.accessToken;
          const newRefreshToken = json.data?.refreshToken;
          if (!newAccessToken || !newRefreshToken) {
            throw new Error("Tokens missing from refresh response");
          }

          // Save rotated refresh token
          setRefreshTokenCookie(newRefreshToken);

          return newAccessToken;
        } catch (err) {
          console.error("Silent refresh caught error:", err);
          setRefreshTokenCookie(null);
          return null;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const newAccessToken = await refreshPromise;

    if (newAccessToken) {
      const currentUser = (api.getState() as RootState).auth.user;
      api.dispatch(setCredentials({ accessToken: newAccessToken, user: currentUser }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
      // Fire visual redirect or event
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth-failure"));
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Post", "Comment", "Likers"],
});
