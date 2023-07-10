import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    // Middleware Function Invoke Only if authorized return true.
    if (req.nextUrl.pathname.split("/")[1] === "admin") {
      const id = req.nextauth.token?.uid;
      const BASE_URL =
        process.env.NODE_ENV === "development"
          ? process.env.DEVELOPMENT_URL
          : process.env.PRODUCTION_URL;

      try {
        const response = await fetch(`${BASE_URL}/api/admin/is-admin?id=${id}`);
        const data = await response.json();

        if (data.error || !data.isAdmin) {
          return new NextResponse("Only Admin can access this page.");
        }
      } catch (error) {
        return new NextResponse("Only Admin can access this page.");
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user-profile/:path*"],
  runtime: "experimental-edge",
};
