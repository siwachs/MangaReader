import { Types } from "mongoose";
import {
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  Adapter,
} from "next-auth/adapters";
import connectToMongoDB from "./connectToMongoDB";

import { partialUser } from "./mongooseSelect";
import Account from "@/models/Account";
import Session from "@/models/Session";
import User from "@/models/User";

const format = {
  /** Takes a MongoDB object and returns a plain old JavaScript object */
  from<T = Record<string, unknown>>(object: Record<string, any>): T {
    const newObject: Record<string, unknown> = {};
    for (const key in object) {
      const value = object[key];
      if (key === "__v") continue;
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
      await connectToMongoDB();
      const { image, ...restOfuser } = data;
      const newUser = await User.create({ ...restOfuser, avatar: image });
      return format.from<AdapterUser>(newUser.toObject());
    },

    async getUser(id: string) {
      await connectToMongoDB();
      const user = await User.findById(id).select(partialUser);
      return user ? format.from<AdapterUser>(user.toObject()) : null;
    },

    async getUserByEmail(email: string) {
      await connectToMongoDB();
      const user = await User.findOne({ email }).select(partialUser);
      return user ? format.from<AdapterUser>(user.toObject()) : null;
    },

    async getUserByAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }) {
      await connectToMongoDB();
      const account = await Account.findOne({ provider, providerAccountId });
      if (!account) return null;
      const user = await User.findById(account.userId).select(partialUser);
      return user ? format.from<AdapterUser>(user.toObject()) : null;
    },

    async updateUser(data) {
      await connectToMongoDB();
      const { _id, ...user } = format.to<AdapterUser>(data);
      const updatedUser = await User.findByIdAndUpdate(user.id, user, {
        new: true,
      });

      return format.from<AdapterUser>(updatedUser.toObject());
    },

    async deleteUser(userId: string) {
      await connectToMongoDB();
      await User.findByIdAndDelete(userId);
    },

    async linkAccount(data) {
      await connectToMongoDB();
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
      await connectToMongoDB();
      await Account.findOneAndDelete({ provider, providerAccountId });
    },

    async createSession(data) {
      await connectToMongoDB();
      const session = format.to<AdapterSession>(data);
      const newSession = await Session.create(session);
      return format.from<AdapterSession>(newSession.toObject());
    },

    async getSessionAndUser(sessionToken: string) {
      await connectToMongoDB();
      const session = await Session.findOne({ sessionToken });
      if (!session) return null;
      const user = await User.findById(session.userId).select(partialUser);
      if (!user) return null;
      return {
        session: format.from<AdapterSession>(session.toObject()),
        user: format.from<AdapterUser>(user.toObject()),
      };
    },

    async updateSession(data) {
      await connectToMongoDB();
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
      await connectToMongoDB();
      await Session.findOneAndDelete({ sessionToken });
    },
  };
}
