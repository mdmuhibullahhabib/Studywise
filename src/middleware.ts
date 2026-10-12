import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const roleForPrefix: Record<string, "STUDENT" | "MENTOR" | "ADMIN"> = {
  "/student": "STUDENT",
  "/mentor": "MENTOR",
  "/admin": "ADMIN"
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const matchedPrefix = Object.keys(roleForPrefix).find((prefix) => pathname.startsWith(prefix));
  if (!matchedPrefix) return NextResponse.next();

  const session = req.auth;
  if (!session?.user) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const requiredRole = roleForPrefix[matchedPrefix];
  // Note: this is UX-level gating for fast redirects. It is not a
  // substitute for server-side role/ownership checks inside each route —
  // see src/lib/permissions.ts, which every server action must also call.
  if (session.user.role !== requiredRole && session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/student/:path*", "/mentor/:path*", "/admin/:path*"]
};
