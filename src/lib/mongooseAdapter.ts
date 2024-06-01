import { Types } from "mongoose";
import {
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  Adapter,
} from "next-auth/adapters";
import connectToMongoDB from "./connectToMongoDB";

import Account from "@/models/Account";
import Session from "@/models/Session";
import User from "@/models/User";

connectToMongoDB();

const format = {
  /** Takes a MongoDB object and returns a plain old JavaScript object */
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

  /** Takes a plain old JavaScript object and turns it into a MongoDB object */
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

export default function mongooseAdapter(): Adapter {
  return {
    async createUser(data) {
      const { image, ...restOfuser } = data;
      const newUser = await User.create({ ...restOfuser, avatar: image });
      return format.from<AdapterUser>(newUser.toObject());
    },

    async getUser(id: string) {
      const user = await User.findById(id).select(
        "-likedChapters -subscriptions -password",
      );
      return user ? format.from<AdapterUser>(user.toObject()) : null;
    },

    async getUserByEmail(email: string) {
      const user = await User.findOne({ email }).select(
        "-likedChapters -subscriptions -password",
      );
      return user ? format.from<AdapterUser>(user.toObject()) : null;
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
      return user ? format.from<AdapterUser>(user.toObject()) : null;
    },

    async updateUser(data) {
      const { _id, ...user } = format.to<AdapterUser>(data);
      const updatedUser = await User.findByIdAndUpdate(user.id, user, {
        new: true,
      });

      return format.from<AdapterUser>(updatedUser.toObject());
    },

    async deleteUser(userId: string) {
      await User.findByIdAndDelete(userId);
    },

    async linkAccount(data) {
      const account = format.to<AdapterAccount>(data);
      const newAccount = await Account.create(account);
      return format.from<AdapterAccount>(newAccount.toObject());
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

    async createSession(data) {
      const session = format.to<AdapterSession>(data);
      const newSession = await Session.create(session);
      return format.from<AdapterSession>(newSession.toObject());
    },

    async getSessionAndUser(sessionToken: string) {
      const session = await Session.findOne({ sessionToken });
      if (!session) return null;
      const user = await User.findById(session.userId).select(
        "-likedChapters -subscriptions -password",
      );
      if (!user) return null;
      return {
        session: format.from<AdapterSession>(session.toObject()),
        user: format.from<AdapterUser>(user.toObject()),
      };
    },

    async updateSession(data) {
      const { _id, ...session } = format.to<AdapterSession>(data);
      const updatedSession = await Session.findOneAndUpdate(
        { sessionToken: session.sessionToken },
        session,
        { new: true },
      );
      return updatedSession
        ? format.from<AdapterSession>(updatedSession.toObject())
        : null;
    },

    async deleteSession(sessionToken: string) {
      await Session.findOneAndDelete({ sessionToken });
    },
  };
}
