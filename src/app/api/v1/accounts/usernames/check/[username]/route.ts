import { NextRequest, NextResponse } from "next/server";

import { notFound, serverError } from "@/libs/apiErrorResponse";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import User from "@/models/User";

const checkUsername = async (
  req: NextRequest,
  dynamicRouteValue: { params: { username: string } },
) => {
  try {
    const username = dynamicRouteValue.params.username;
    if (username.trim() === "") return notFound(["username"]);

    await connectToMongoDB();
    const userId = await User.findOne({ username }).select("_id");

    return NextResponse.json(
      { error: false, usernameAvailable: userId === null },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { checkUsername as GET };
