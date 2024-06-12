import { NextRequest, NextResponse } from "next/server";

import formatMongooseDoc from "@/libs/formatMongooseDoc";
import getServerSession from "@/libs/getServerSession";
import connectToMongoDB from "@/libs/connectToMongoDB";
import Comment from "@/models/Comment";
import User from "@/models/User";

const PAGE_NUMBER = 1;
const PAGE_SIZE = 36;
const COMMENTS_SORT_KEY = "BEST";

const getComments = async (req: NextRequest) => {
  try {
    const contentId = req.nextUrl.searchParams.get("contentId");
    if (!contentId)
      return NextResponse.json(
        {
          error: true,
          errorMessage: "Invalid query parameters contentId is required.",
        },
        { status: 400 },
      );

    const chapterId = !req.nextUrl.searchParams.get("chapterId")
      ? null
      : req.nextUrl.searchParams.get("chapterId");

    const pageNumber =
      parseInt(req.nextUrl.searchParams.get("pageNumber")!) || PAGE_NUMBER;
    const pageSize =
      parseInt(req.nextUrl.searchParams.get("pageSize")!) || PAGE_SIZE;

    const commentsSortKey = !req.nextUrl.searchParams.get("commentsSortKey")
      ? COMMENTS_SORT_KEY
      : req.nextUrl.searchParams.get("commentsSortKey");

    const matchConditions = [{ contentId }, { chapterId }];

    let sortingConditions: Record<string, 1 | -1> = {};
    if (commentsSortKey === "NEWEST") sortingConditions = { createdAt: -1 };
    else if (commentsSortKey === "OLDEST") sortingConditions = { createdAt: 1 };
    else sortingConditions = { likes: -1, createdAt: -1 };

    await connectToMongoDB();
    const aggregatedData = await Comment.aggregate([
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
                "user.username": 1,
                "user.avatar": 1,
                likes: 1,
                dislikes: 1,
                isEdited: 1,
                isReported: 1,
                isDeleted: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],
        },
      },
    ]);

    const { totalComments = 0 } = aggregatedData[0].metaData[0] ?? {};
    const comments =
      aggregatedData[0].data?.map((comment: any) =>
        formatMongooseDoc(comment),
      ) ?? [];

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
    return NextResponse.json(
      {
        error: true,
        errorMessage: error.message,
      },
      { status: 500 },
    );
  }
};

const addComment = async (req: NextRequest) => {
  try {
    const { contentId, chapterId, userId, parentId, message } =
      await req.json();
    if (!contentId || !userId || !message.trim())
      return NextResponse.json(
        {
          error: true,
          errorMessage: "Invalid body bad request.",
        },
        { status: 400 },
      );

    const serverSession = await getServerSession(userId);
    if (!serverSession)
      return NextResponse.json(
        { error: true, errorMessage: "401 Unauthorized user." },
        { status: 401 },
      );

    await connectToMongoDB();
    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json(
        {
          error: true,
          errorMessage: "User not found.",
        },
        { status: 404 },
      );

    const comment = await Comment.create({
      parentId: parentId ?? "root",
      message,
      contentId,
      chapterId: chapterId ?? null,
      user: userId,
    });
    await comment.populate({ path: "user", select: "username avatar -_id" });

    return NextResponse.json(
      { error: false, comment: formatMongooseDoc(comment.toObject()) },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        errorMessage: error.message,
      },
      { status: 500 },
    );
  }
};

export { getComments as GET, addComment as POST };
