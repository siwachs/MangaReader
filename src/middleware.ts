import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Middleware Logic.
}

export const config = {
  matcher: ["/admin/:path*"],
};
