import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;

  // **PROTECT DASHBOARD** - No token → Login
  if (pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // **BLOCK LOGIN** - Has token → Dashboard
  if (pathname === "/auth/login" && token) {
    const dashboardUrl = new URL("/dashboard/users", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
