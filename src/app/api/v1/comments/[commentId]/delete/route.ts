import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import {
  serverError,
  invalidHeaders,
  notFound,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import formatMongooseDoc from "@/libs/db/formatMongooseDoc";
import getServerSession from "@/libs/auth/getServerSession";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import { Comment } from "@/models";

const deleteComment = async (
  req: NextRequest,
  dynamicRouteValue: { params: { commentId: string } },
) => {
  try {
    const userId = headers().get("x-user-id");
    if (!userId) return invalidHeaders(["x-user-id"]);

    await connectToMongoDB();
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
