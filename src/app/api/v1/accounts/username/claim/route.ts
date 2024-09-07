import { NextRequest, NextResponse } from "next/server";

import {
  notFound,
  serverError,
  unauthorizedUser,
  badRequest,
  invalidBody,
} from "@/libs/apiErrorResponse";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import getServerSession from "@/libs/auth/getServerSession";
import { User } from "@/models";

const claimUsername = async (req: NextRequest) => {
  try {
    const { userId, username } = await req.json();
    const trimmedUsername = username?.trim();
    if (!trimmedUsername) return invalidBody(["userId", "username"]);

    await connectToMongoDB();

    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();

    const usernameAvailable = await User.findOne({
      username: trimmedUsername,
    }).select("_id");
    if (usernameAvailable !== null)
      return badRequest("Username already claimed.");

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: trimmedUsername },
      { new: true, runValidators: true },
    ).select("_id");
    if (!updatedUser) return notFound(["User"]);

    return NextResponse.json(
      { error: false, claimedUsername: trimmedUsername },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { claimUsername as PUT };
