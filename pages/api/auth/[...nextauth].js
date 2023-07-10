import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import connectToDB from "@/lib/connectToDB";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectToDB();
        const user = await User.findOne({ email: profile.email });

        if (user) {
          account.uid = user._id.toString();
          account.isAdmin = user.isAdmin;
          account.profilePicture = user.profilePicture;
          account.isNewUser = false;
          return true;
        }

        const userObj = new User({
          name: profile.name,
          email: profile.email,
          profilePicture: profile.picture,
        });

        const addedUser = await userObj.save();
        account.uid = addedUser._id.toString();
        account.isAdmin = addedUser.isAdmin;
        account.isNewUser = true;

        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.uid = account.uid;
        token.isAdmin = account.isAdmin;
        token.isNewUser = account.isNewUser;
        if (!account.isNewUser) {
          token.picture = account.profilePicture;
        }
      }

      return token;
    },
    async session({ session, user, token }) {
      session.user.uid = token.uid;
      session.user.isAdmin = token.isAdmin;
      if (!token.isNewUser) {
        session.user.image = token.picture;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
