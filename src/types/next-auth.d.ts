import NextAuth, { DefaultSession } from "next-auth";

import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    isAdmin?: boolean;
    emailVerified?: boolean | null;
    createdAt: string;
    updatedAt: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string | null;
      isAdmin?: boolean;
    };
    accessToken?: string;
    expires: DefaultSession["expires"];
  }
}
