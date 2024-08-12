import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import {
  serverError,
  invalidHeaders,
  notFound,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import { partialUser } from "@/libs/db/mongooseSelect";
import formatMongooseDoc from "@/libs/db/formatMongooseDoc";
import getServerSession from "@/libs/db/getServerSession";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import Comment from "@/models/Comment";
import User from "@/models/User";

const deleteComment = async (
  req: NextRequest,
  dynamicRouteValue: { params: { commentId: string } },
) => {
  try {
    const userId = headers().get("x-user-id");
    if (!userId) return invalidHeaders(["x-user-id"]);

    await connectToMongoDB();
    const user = await User.findById(userId).select(partialUser);
    if (!user) return notFound(["User"]);

    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();

    const commentId = dynamicRouteValue.params.commentId;
    const comment = await Comment.findById(commentId).populate(
      "user",
      "username avatar",
    );
    if (!comment) return notFound(["Comment"]);

    comment.isDeleted = !comment.isDeleted;
    await comment.save();

    return NextResponse.json(
      {
        error: false,
        comment: formatMongooseDoc(comment.toObject(), "Comment"),
      },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { deleteComment as DELETE };
