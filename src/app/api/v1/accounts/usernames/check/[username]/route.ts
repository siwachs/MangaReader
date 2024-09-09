import { NextRequest, NextResponse } from "next/server";

import { PROFILE_MANAGEMENT_USERNAME_ALREADY_CLAIMED } from "@/constants";
import { notFound, serverError } from "@/libs/apiErrorResponse";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import User from "@/models/User";

const checkUsername = async (
  req: NextRequest,
  dynamicRouteValue: { params: { username: string } },
) => {
  try {
    const username = dynamicRouteValue.params.username;
    const trimmedUsername = username.trim();
    if (trimmedUsername === "") return notFound(["username"]);

    await connectToMongoDB();
    const userId = await User.findOne({ username: trimmedUsername }).select(
      "_id",
    );

    return NextResponse.json(
      {
        errorMessage:
          userId === null ? null : PROFILE_MANAGEMENT_USERNAME_ALREADY_CLAIMED,
        usernameAvailable: userId === null,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { checkUsername as GET };
