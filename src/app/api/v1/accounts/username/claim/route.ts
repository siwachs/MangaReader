import { NextRequest, NextResponse } from "next/server";

import {
  notFound,
  serverError,
  unauthorizedUser,
  badRequest,
  invalidBody,
} from "@/libs/apiErrorResponse";
import connectToMongoDB from "@/libs/connectToMongoDB";
import getServerSession from "@/libs/getServerSession";
import User from "@/models/User";

const claimUsername = async (req: NextRequest) => {
  try {
    const { userId, username } = await req.json();
    const trimmedUsername = username?.trim();
    if (!trimmedUsername) return invalidBody(["userId", "username"]);

    await connectToMongoDB();
    const user = await User.findById(userId).select("_id");
    if (!user) return notFound(["User"]);

    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();

    const usernameAvailable = await User.findOne({ username }).select("_id");
    if (usernameAvailable !== null)
      return badRequest("Username already claimed.");

    user.username = trimmedUsername;
    await user.save();

    return NextResponse.json(
      { error: false, claimedUsername: trimmedUsername },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { claimUsername as PUT };
