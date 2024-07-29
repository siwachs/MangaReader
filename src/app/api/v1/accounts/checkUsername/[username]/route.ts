import { NextRequest, NextResponse } from "next/server";

import { serverError } from "@/libs/apiErrorResponse";
import connectToMongoDB from "@/libs/connectToMongoDB";
import User from "@/models/User";

const checkUsername = async (
  req: NextRequest,
  dynamicRouteValue: { params: { username: string } },
) => {
  try {
    const username = dynamicRouteValue.params.username;
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
