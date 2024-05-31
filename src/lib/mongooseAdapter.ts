import { Types } from "mongoose";
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

const format = {
  from<T = Record<string, unknown>>(object: Record<string, any>): T {
    const newObject: Record<string, unknown> = {};
    for (const key in object) {
      const value = object[key];
      if (key === "_id") {
        newObject.id = value.toString();
      } else if (key === "userId") {
        newObject[key] = value.toString();
      } else {
        newObject[key] = value;
      }
    }
    return newObject as T;
  },

  to<T = Record<string, unknown>>(object: Record<string, any>) {
    const newObject: Record<string, unknown> = {
      _id: _id(object.id),
    };
    for (const key in object) {
      const value = object[key];
      if (key === "userId") newObject[key] = _id(value);
      else if (key === "id") continue;
      else newObject[key] = value;
    }
    return newObject as T & { _id: Types.ObjectId };
  },
};

function _id(hex?: string) {
  return hex?.length === 24 ? new Types.ObjectId(hex) : new Types.ObjectId();
}

/** @return { import("next-auth/adapters").Adapter } */
export default function mongooseAdapter() {
  return {
    async createUser(user: AdapterUser) {
      const { image, ...restOfUser } = user;
      const newUser = await User.create({ ...restOfUser, avatar: image });
      return format.from(newUser.toObject());
    },

    async getUser(id: string) {
      const user = await User.findById(id).select(
        "-likedChapters -subscriptions -password",
      );
      return user ? format.from(user.toObject()) : null;
    },

    async getUserByEmail(email: string) {
      const user = await User.findOne({ email }).select(
        "-likedChapters -subscriptions -password",
      );
      return user ? format.from(user.toObject()) : null;
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
      const user = await User.findById(account.userId).select(
        "-likedChapters -subscriptions -password",
      );
      return user ? format.from(user.toObject()) : null;
    },

    async updateUser(user: AdapterUser) {
      const updatedUser = await User.findByIdAndUpdate(user.id, user, {
        new: true,
      });
      return updatedUser ? format.from(updatedUser.toObject()) : null;
    },

    async deleteUser(userId: string) {
      await User.findByIdAndDelete(userId);
    },

    async linkAccount(account: AdapterAccount) {
      const newAccount = await Account.create(account);
      return format.from(newAccount.toObject());
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
      const newSession = await Session.create(session);
      return format.from(newSession.toObject());
    },

    async getSessionAndUser(sessionToken: string) {
      const session = await Session.findOne({ sessionToken });
      if (!session) return null;
      const user = await User.findById(session.userId).select(
        "-likedChapters -subscriptions -password",
      );
      return {
        session: format.from(session.toObject()),
        user: user ? format.from(user.toObject()) : null,
      };
    },

    async updateSession(session: AdapterSession) {
      const updatedSession = await Session.findOneAndUpdate(
        { sessionToken: session.sessionToken },
        session,
        { new: true },
      );
      return updatedSession ? format.from(updatedSession.toObject()) : null;
    },

    async deleteSession(sessionToken: string) {
      await Session.findOneAndDelete({ sessionToken });
    },
  };
}
