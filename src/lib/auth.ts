import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import mongooseAdapter from "./mongooseAdapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: { logo: "/MangaToon.svg" },
  adapter: mongooseAdapter(),
  providers: [Google],
});
