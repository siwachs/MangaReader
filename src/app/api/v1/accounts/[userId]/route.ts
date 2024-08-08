import { NextRequest, NextResponse } from "next/server";

import {
  notFound,
  serverError,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import connectToMongoDB from "@/libs/connectToMongoDB";
import getServerSession from "@/libs/getServerSession";
import User from "@/models/User";

const updateProfile = async (
  req: NextRequest,
  dynamicRouteValue: { params: { userId: string } },
) => {
  try {
    const profileData = await req.json();
    const userId = dynamicRouteValue.params.userId;

    await connectToMongoDB();
    const user = await User.findById(userId).select("_id");
    if (!user) return notFound(["User"]);

    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();

    await User.findByIdAndUpdate(userId, profileData, {
      runValidators: true,
    });

    return NextResponse.json({ error: false }, { status: 200 });
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { updateProfile as PUT };
