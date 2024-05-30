import {
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from "next-auth/adapters";
import connectToMongoDB from "./connectToMongoDB";

import Account from "@/models/Account";
import Session from "@/models/Session";
import User from "@/models/User";

connectToMongoDB();

/** @return { import("next-auth/adapters").Adapter } */
export default function mongooseAdapter() {
  return {
    async createUser(user: AdapterUser) {
      const { image, ...restOfUser } = user;
      return await User.create({ ...restOfUser, avatar: image });
    },

    async getUser(id: string) {
      return await User.findById(id).select("-likedChapters -subscriptions");
    },

    async getUserByEmail(email: string) {
      return await User.findOne({ email }).select(
        "-likedChapters -subscriptions",
      );
    },

    async getUserByAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }) {
      const account = await Account.findOne({ provider, providerAccountId });
      if (!account) return null;
      return await User.findById(account.userId);
    },

    async updateUser(user: AdapterUser) {
      return await User.findByIdAndUpdate(user.id, user, { new: true });
    },

    async deleteUser(userId: string) {
      await User.findByIdAndDelete(userId);
    },

    async linkAccount(account: AdapterAccount) {
      return await Account.create(account);
    },

    async unlinkAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }) {
      await Account.findOneAndDelete({ provider, providerAccountId });
    },

    async createSession(session: AdapterSession) {
      return await Session.create(session);
    },

    async getSessionAndUser(sessionToken: string) {
      const session = await Session.findOne({ sessionToken });
      if (!session) return null;
      const user = await User.findById(session.userId).select(
        "-likedChapters -subscriptions",
      );
      return { session, user };
    },

    async updateSession(session: AdapterSession) {
      return await Session.findOneAndUpdate(
        { sessionToken: session.sessionToken },
        session,
        { new: true },
      );
    },

    async deleteSession(sessionToken: string) {
      await Session.findOneAndDelete({ sessionToken });
    },
  };
}
