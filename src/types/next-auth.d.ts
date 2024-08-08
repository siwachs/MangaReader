import NextAuth, { DefaultSession } from "next-auth";

import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    username?: string;
    email: string;
    gender?: "Male" | "Female";
    avatar?: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  }

  interface Session {
    id: string;
    user: User;
    expires: string;
  }
}
