import { NextRequest, NextResponse } from "next/server";

import {
  invalidBody,
  serverError,
  notFound,
  unauthorizedUser,
  methodNotAllowed,
} from "@/libs/apiErrorResponse";
import { VoteType } from "@/types";
import { partialUserWithVotedComments } from "@/libs/mongooseSelect";
import formatMongooseDoc from "@/libs/formatMongooseDoc";
import getServerSession from "@/libs/getServerSession";
import connectToMongoDB from "@/libs/connectToMongoDB";
import Comment from "@/models/Comment";
import User from "@/models/User";

type CommentType = {
  downVotes: number;
  upVotes: number;
  isUpdated?: boolean;
};

const addVote = (comment: CommentType, voteType: VoteType): CommentType => {
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

  return { upVotes: comment.upVotes, downVotes: comment.downVotes };
};

const removeVote = (comment: CommentType, voteType: VoteType): CommentType => {
  if (voteType === "up") {
    comment.upVotes -= 1;

    if (comment.downVotes < 0) comment.downVotes -= 1;
  } else if (voteType === "down") {
    comment.downVotes += 1;

    if (comment.upVotes > 0) comment.upVotes += 1;
  }

  return comment;
};

const editVote = (
  comment: CommentType,
  voteType: VoteType,
  alreadyVotedVoteType: VoteType,
): CommentType => {
  if (voteType === alreadyVotedVoteType) {
    const removedVote = removeVote(comment, voteType);

    return {
      upVotes: removedVote.upVotes,
      downVotes: removedVote.downVotes,
    };
  }

  const removedVote = removeVote(comment, alreadyVotedVoteType);
  const addedVote = addVote(removedVote, voteType);
  return {
    upVotes: addedVote.upVotes,
    downVotes: addedVote.downVotes,
    isUpdated: true,
  };
};

const upVote = async (
  req: NextRequest,
  dynamicRouteValue: { params: { commentId: string; voteType: VoteType } },
) => {
  try {
    const { userId, contentId, chapterId } = await req.json();
    const voteType = dynamicRouteValue.params.voteType;

    if (
      !userId ||
      !contentId ||
      !chapterId ||
      (voteType !== "up" && voteType !== "down")
    )
      return invalidBody(["userId", "contentId", "chapterId", "voteType"]);

    await connectToMongoDB();
    const user = await User.findById(userId).select(
      partialUserWithVotedComments,
    );
    if (!user) return notFound(["User"]);

    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();

    const commentId = dynamicRouteValue.params.commentId;
    const comment = await Comment.findById(commentId).populate(
      "user",
      "username avatar",
    );
    if (!comment) return notFound(["Comment"]);
    if (comment.isDeleted) return methodNotAllowed();

    const alreadyVotedIndex = user.votedComments.findIndex(
      (votedComment: { commentId: string; type: "up" | "down" }) =>
        votedComment.commentId === commentId,
    );

    let voteRemoved = false;
    if (alreadyVotedIndex !== -1) {
      const editedVote = editVote(
        comment,
        voteType,
        user.votedComments[alreadyVotedIndex].voteType,
      );
      comment.upVotes = editedVote.upVotes;
      comment.downVotes = editedVote.downVotes;

      if (editedVote.isUpdated)
        user.votedComments[alreadyVotedIndex].voteType = voteType;
      else {
        voteRemoved = true;
        user.votedComments.splice(alreadyVotedIndex, 1);
      }
    } else {
      const addedVote = addVote(comment, voteType);
      comment.upVotes = addedVote.upVotes;
      comment.downVotes = addedVote.downVotes;
      user.votedComments.push({ commentId, contentId, chapterId, voteType });
    }

    await comment.save();
    await user.save();

    return NextResponse.json(
      {
        error: false,
        comment: {
          ...formatMongooseDoc(comment.toObject()),
          voteType: voteRemoved ? undefined : voteType,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { upVote as PUT };
