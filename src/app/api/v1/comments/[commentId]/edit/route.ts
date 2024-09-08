import { NextRequest, NextResponse } from "next/server";

import {
  invalidBody,
  methodNotAllowed,
  notFound,
  serverError,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import formatMongooseDoc from "@/libs/db/formatMongooseDoc";
import getServerSession from "@/libs/auth/getServerSession";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import { Comment } from "@/models";

const editComment = async (
  req: NextRequest,
  dynamicRouteValue: { params: { commentId: string } },
) => {
  try {
    const reqBody = await req.json();
    const { userId, message } = reqBody;
    if (!userId || !message?.trim()) return invalidBody(["userId", "message"]);

    await connectToMongoDB();
    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();

    const { user } = serverSession;
    const commentId = dynamicRouteValue.params.commentId;
    const comment = await Comment.findById(commentId);
    if (!comment) return notFound(["Comment"]);
    if (comment.isDeleted) return methodNotAllowed();

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      { message, isEdited: true },
      { new: true },
    );

    return NextResponse.json(
      {
        error: false,
        comment: {
          ...formatMongooseDoc(editedComment.toObject()),
          user: {
            id: user.id,
            username: user?.username,
            avatar: user?.avatar,
          },
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { editComment as PUT };
