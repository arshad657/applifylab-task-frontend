let inMemoryToken: string | null = null;

/**
 * Gets the current in-memory JWT Access Token.
 */
export function getAccessToken(): string | null {
  return inMemoryToken;
}

/**
 * Sets or clears the in-memory JWT Access Token.
 */
export function setAccessToken(token: string | null): void {
  inMemoryToken = token;
}

/**
 * Sets or deletes the refreshToken cookie.
 */
export function setRefreshTokenCookie(token: string | null): void {
  if (typeof window === "undefined") return;
  if (!token) {
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure";
  } else {
    // Expires in 7 days
    const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
    document.cookie = `refreshToken=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
  }
}

/**
 * Gets the refreshToken from cookies.
 */
export function getRefreshTokenCookie(): string | null {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; refreshToken=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(";").shift() || "");
  }
  return null;
}
