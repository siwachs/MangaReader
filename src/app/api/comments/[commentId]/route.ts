import { NextRequest, NextResponse } from "next/server";

import {
  invalidBody,
  notFound,
  serverError,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import formatMongooseDoc from "@/libs/formatMongooseDoc";
import getServerSession from "@/libs/getServerSession";
import connectToMongoDB from "@/libs/connectToMongoDB";
import Comment from "@/models/Comment";
import User from "@/models/User";

const editComment = async (
  req: NextRequest,
  dynamicRouteValue: { params: { commentId: string } },
) => {
  try {
    const reqBody = await req.json();
    const { userId, message } = reqBody;
    if (!userId || !message?.trim()) return invalidBody(["userId", "message"]);

    await connectToMongoDB();
    const user = await User.findById(userId);
    if (!user) return notFound(["User"]);

    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();

    const commentId = dynamicRouteValue.params.commentId;
    const comment = await Comment.findById(commentId);
    if (!comment) return notFound(["Comment"]);

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      { message, isEdited: true },
      { new: true },
    );

    return NextResponse.json(
      { error: false, comment: formatMongooseDoc(editedComment.toObject()) },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { editComment as PUT };
