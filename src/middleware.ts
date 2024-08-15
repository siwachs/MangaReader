import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
  }
}

export const config = {
  matcher: "/admin/:path*",
};
