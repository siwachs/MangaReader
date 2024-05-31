import NextAuth from "next-auth";

import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
    isAdmin?: boolean;
    emailVerified?: boolean | null;
    createdAt: string;
    updatedAt: string;
  }
}
