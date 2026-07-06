"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, User } from "@/src/redux/authSlice";
import type { RootState, AppDispatch } from "@/src/redux/store";
import { setAccessToken, setRefreshTokenCookie, getRefreshTokenCookie } from "@/src/lib/token";
import {
  useRefreshMutation,
  useLogoutMutation,
  authApi,
} from "@/src/redux/api/authApi";
import { baseApi } from "@/src/redux/api/baseApi";
import { handleError } from "@/src/lib/handleError";
import { UploadProfilePictureModal } from "./UploadProfilePictureModal";

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function decodeJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const [refreshApi] = useRefreshMutation();
  const [logoutApi] = useLogoutMutation();

  // Read auth state from Redux store
  const { isAuthenticated, accessToken, user, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("user: ", user)

  const setAuthState = (token: string | null, userData: User | null) => {
    setAccessToken(token);
    dispatch(setCredentials({ accessToken: token, user: userData }));
  };

  const login = (token: string, refreshToken: string, userData: User) => {
    setRefreshTokenCookie(refreshToken);
    setAuthState(token, userData);
    console.log("access token: ", token, userData);
    router.push("/feed");
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const rfToken = getRefreshTokenCookie();
      if (!rfToken) {
        throw new Error("No refresh token cookie found");
      }

      const response = await refreshApi({ refreshToken: rfToken }).unwrap();

      if (response.status === "success") {
        const dataPayload = response.data || response;
        const newAccessToken = dataPayload.accessToken;
        const newRefreshToken = dataPayload.refreshToken;

        if (newAccessToken && newRefreshToken) {
          setRefreshTokenCookie(newRefreshToken);
          const payload = decodeJwt(newAccessToken);
          const username = payload?.email;

          if (username) {
            // Set access token in the store first so getProfile is request-signed
            setAuthState(newAccessToken, null);

            // Load user profile using RTK Query
            const profileResult = await dispatch(
              authApi.endpoints.getProfile.initiate(username)
            ).unwrap();

            if (profileResult.status === "success") {
              const profileUser = profileResult.data;

              const loggedInUser: User = {
                id: profileUser.id,
                email: payload.email || "",
                firstName: profileUser.firstName,
                lastName: profileUser.lastName,
                avatarUrl: profileUser.avatarUrl,
                bio: profileUser.bio,
                createdAt: profileUser.createdAt,
              };

              setAuthState(newAccessToken, loggedInUser);
              return newAccessToken;
            }
          }
        }
      }
    } catch (err) {
      console.error("Startup silent refresh failed", err);
    }

    setRefreshTokenCookie(null);
    setAuthState(null, null);
    return null;
  };

  const logout = async () => {
    try {
      const rfToken = getRefreshTokenCookie();
      await logoutApi({ refreshToken: rfToken || "" }).unwrap();

      // Executed only upon successful backend API response
      setRefreshTokenCookie(null);
      setAuthState(null, null);
      dispatch(baseApi.util.resetApiState());
      router.push("/login");
    } catch (err) {
      handleError(err);
    }
  };

  // Run silent refresh on mount
  useEffect(() => {
    refreshAccessToken();
  }, []);

  // Listen to standalone fetch 401 failure events
  useEffect(() => {
    const handleAuthFailure = () => {
      setAuthState(null, null);
      router.push("/login");
    };

    window.addEventListener("auth-failure", handleAuthFailure);
    return () => {
      window.removeEventListener("auth-failure", handleAuthFailure);
    };
  }, [router]);

  // Client-side route protection redirects
  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      if (pathname === "/login" || pathname === "/register") {
        router.replace("/feed");
      }
    } else {
      if (pathname === "/feed") {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading Buddy Script...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        user,
        isLoading,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
      <UploadProfilePictureModal />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
