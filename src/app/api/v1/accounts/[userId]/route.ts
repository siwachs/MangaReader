import { NextRequest, NextResponse } from "next/server";

import {
  notFound,
  serverError,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import getServerSession from "@/libs/auth/getServerSession";
import User from "@/models/User";

const updateProfile = async (
  req: NextRequest,
  dynamicRouteValue: { params: { userId: string } },
) => {
  try {
    const profileData = await req.json();
    const userId = dynamicRouteValue.params.userId;

    await connectToMongoDB();

    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();

    const updatedUser = await User.findByIdAndUpdate(userId, profileData, {
      new: true,
      runValidators: true,
    }).select("_id");
    if (!updatedUser) return notFound(["User"]);

    return NextResponse.json({ error: false }, { status: 200 });
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { updateProfile as PUT };
