import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import mongooseAdapter from "./mongooseAdapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: { logo: "/MangaToon.svg" },
  adapter: mongooseAdapter(),
  callbacks: {
    async session({ session }) {
      return {
        id: session.id,
        user: session.user,
        expires: session.expires,
      };
    },
  },
  providers: [Google],
});
