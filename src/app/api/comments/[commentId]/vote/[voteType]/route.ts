import { NextRequest, NextResponse } from "next/server";

import {
  invalidBody,
  serverError,
  notFound,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import { partialUserWithVotedComments } from "@/libs/mongooseSelect";
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
    const { userId } = await req.json();
    const voteType = dynamicRouteValue.params.voteType;

    if (!userId || (voteType !== "up" && voteType !== "down"))
      return invalidBody(["userId", "voteType"]);

    await connectToMongoDB();
    const user = await User.findById(userId).select(
      partialUserWithVotedComments,
    );
    if (!user) return notFound(["User"]);

    // const serverSession = await getServerSession(userId);
    // if (!serverSession) return unauthorizedUser();

    const commentId = dynamicRouteValue.params.commentId;
    const comment = await Comment.findById(commentId);
    if (!comment) return notFound(["Comment"]);

    const alreadyVoted = user.votedComments.find(
      (votedComment: { commentId: string; type: "up" | "down" }) =>
        votedComment.commentId === commentId,
    );

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
    user.votedComments.push({ commentId, voteType });

    await comment.save();
    await user.save();

    return NextResponse.json(
      { error: false, comment: formatMongooseDoc(comment) },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { upVote as PUT };
