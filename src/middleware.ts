import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Add Middleware logic.
}

export const config = {
  matcher: "/admin/:path*",
};
