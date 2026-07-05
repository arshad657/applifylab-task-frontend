import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/feed"];
const publicRoutes = ["/login", "/register"];

/**
 * Global proxy logic to validate session access on route transitions.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if trying to access a protected route without a session cookie
  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to feed if trying to access public auth pages with an active session cookie
  if (isPublicRoute && refreshToken) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

// Support default export
export default proxy;

// Support named middleware alias
export const middleware = proxy;

// Config rules specifying matching routes
export const config = {
  matcher: ["/feed", "/login", "/register"],
};
