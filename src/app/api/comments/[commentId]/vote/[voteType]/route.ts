import { NextRequest, NextResponse } from "next/server";

import {
  invalidBody,
  serverError,
  notFound,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import formatMongooseDoc from "@/libs/formatMongooseDoc";
import getServerSession from "@/libs/getServerSession";
import connectToMongoDB from "@/libs/connectToMongoDB";
import Comment from "@/models/Comment";
import User from "@/models/User";

const upVote = async (
  req: NextRequest,
  dynamicRouteValue: { params: { commentId: string; voteType: "up" | "down" } },
) => {
  try {
    const reqBody = await req.json();
    const { userId } = reqBody;

    if (!userId) return invalidBody(["userId"]);

    await connectToMongoDB();
    const user = await User.findById(userId);
    if (!user) return notFound(["User"]);

    // const serverSession = await getServerSession(userId);
    // if (!serverSession) return unauthorizedUser();

    const commentId = dynamicRouteValue.params.commentId;
    const comment = await Comment.findById(commentId);
    if (!comment) return notFound(["Comment"]);

    const voteType = dynamicRouteValue.params.voteType;
    if (voteType === "up") {
      if (comment.downVotes < 0) {
        comment.downVotes += 1;
      }

      comment.upVotes += 1;
    } else if (voteType === "down") {
      if (comment.upVotes > 0) {
        comment.upVotes -= 1;
      }

      comment.downVotes -= 1;
    }
    await comment.save();

    return NextResponse.json(
      { error: false, comment: formatMongooseDoc(comment) },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { upVote as PUT };
