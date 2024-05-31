import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {}

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
