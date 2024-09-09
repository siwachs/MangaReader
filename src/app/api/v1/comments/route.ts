import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

import {
  DEFAULT_NESTED_COMMENT_SYSTEM_PAGE_NUMBER,
  DEFAULT_NESTED_COMMENT_SYSTEM_SORT_KEY,
  DEFAULT_NESTED_COMMENT_SYSTEM_PAGE_SIZE,
  NESTED_COMMENT_SET_A_USERNAME_MESSAGE,
} from "@/constants";
import { Comment as CommentType, SortKey, VoteType } from "@/types";
import {
  invalidBody,
  invalidQuery,
  methodNotAllowed,
  serverError,
  unauthorizedUser,
} from "@/libs/apiErrorResponse";
import formatMongooseDoc from "@/libs/db/formatMongooseDoc";
import getServerSession from "@/libs/auth/getServerSession";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import { Comment, User } from "@/models";

const getComments = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const contentId = searchParams.has("contentId")
      ? (searchParams.get("contentId") as string).trim()
      : null;
    if (!contentId) return invalidQuery(["contentId"]);

    const chapterId = searchParams.has("chapterId")
      ? searchParams.get("chapterId")
      : null;

    const pageNumber = searchParams.has("pageNumber")
      ? parseInt(searchParams.get("pageNumber") as string)
      : DEFAULT_NESTED_COMMENT_SYSTEM_PAGE_NUMBER;
    const pageSize = searchParams.has("pageSize")
      ? parseInt(searchParams.get("pageSize") as string)
      : DEFAULT_NESTED_COMMENT_SYSTEM_PAGE_SIZE;

    const commentsSortKey: SortKey = searchParams.has("commentsSortKey")
      ? (searchParams.get("commentsSortKey") as SortKey)
      : DEFAULT_NESTED_COMMENT_SYSTEM_SORT_KEY;

    const matchConditions = [{ contentId }, { chapterId }];
    let sortingConditions: Record<string, 1 | -1> = {};

    if (commentsSortKey === "NEWEST") sortingConditions = { createdAt: -1 };
    else if (commentsSortKey === "OLDEST") sortingConditions = { createdAt: 1 };
    else sortingConditions = { upVotes: -1, createdAt: -1 };

    await connectToMongoDB();
    const aggregatedComments = await Comment.aggregate([
      {
        $facet: {
          metaData: [
            { $match: { $and: matchConditions } },
            { $count: "totalComments" },
          ],
          data: [
            { $match: { $and: matchConditions } },
            { $sort: sortingConditions },
            { $skip: (pageNumber - 1) * pageSize },
            { $limit: pageSize },
            {
              $lookup: {
                from: "Users",
                localField: "user",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $addFields: {
                user: {
                  $arrayElemAt: ["$user", 0],
                },
              },
            },
            {
              $project: {
                parentId: 1,
                message: 1,
                contentId: 1,
                chapterId: 1,
                "user._id": 1,
                "user.username": 1,
                "user.avatar": 1,
                upVotes: 1,
                downVotes: 1,
                isEdited: 1,
                isReported: 1,
                isDeleted: 1,
                createdAt: 1,
                updatedAt: 1,
                votedComments: 1,
              },
            },
          ],
        },
      },
    ]);

    const { totalComments = 0 } = aggregatedComments[0].metaData[0] ?? {};
    const comments =
      aggregatedComments[0].data?.map((comment: any) =>
        formatMongooseDoc(comment, "Comment"),
      ) ?? [];

    const serverSession = await getServerSession();
    if (serverSession) {
      const aggregatedUser = await User.aggregate([
        {
          $match: { _id: new Types.ObjectId(serverSession.user.id) },
        },
        {
          $addFields: {
            votedComments: {
              $filter: {
                input: "$votedComments",
                as: "votedComment",
                cond: {
                  $and: [
                    { $eq: ["$$votedComment.contentId", contentId] },
                    { $eq: ["$$votedComment.chapterId", chapterId] },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            votedComments: 1,
          },
        },
      ]);

      const votedComments = aggregatedUser[0]?.votedComments ?? [];

      if (votedComments.length) {
        comments.map((comment: CommentType, index: number) => {
          const votedComment: { voteType: VoteType } = votedComments.find(
            (c: { commentId: string }) => c.commentId === comment.id,
          );

          if (votedComment)
            comments[index] = { ...comment, voteType: votedComment.voteType };
        });
      }
    }

    return NextResponse.json(
      {
        error: false,
        totalPages: Math.ceil(totalComments / pageSize),
        totalComments,
        pageNumber,
        comments,
        sortKey: commentsSortKey,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

const addComment = async (req: NextRequest) => {
  try {
    const {
      contentId,
      chapterId = null,
      userId,
      parentId = "root",
      message = "",
    } = await req.json();
    if (!contentId || !userId || !message.trim())
      return invalidBody(["contentId", "userId", "message"]);

    const scriptTagRegex = /<\s*script[\s\S]*?>[\s\S]*?<\s*\/\s*script\s*>/gi;
    const eventAttributeRegex = /on\w+\s*=\s*(['"])(.*?)\1(?=\s|\/|>)/gi;
    if (scriptTagRegex.test(message) || eventAttributeRegex.test(message)) {
      return invalidBody();
    }

    await connectToMongoDB();
    const serverSession = await getServerSession(userId);
    if (!serverSession) return unauthorizedUser();
    if (!serverSession.user.username)
      return methodNotAllowed(NESTED_COMMENT_SET_A_USERNAME_MESSAGE);

    const { user } = serverSession;
    const comment = await Comment.create({
      parentId,
      message,
      contentId,
      chapterId,
      user: userId,
    });

    return NextResponse.json(
      {
        error: false,
        comment: {
          ...formatMongooseDoc(comment.toObject()),
          user: {
            id: user.id,
            username: user?.username,
            avatar: user?.avatar,
          },
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { getComments as GET, addComment as POST };
