import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import mongoClientPromise from "./mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise),
  providers: [Google],
});
