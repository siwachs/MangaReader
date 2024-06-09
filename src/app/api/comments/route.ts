import { NextRequest, NextResponse } from "next/server";

import getServerSession from "@/libs/getServerSession";
import connectToMongoDB from "@/libs/connectToMongoDB";
import Comment from "@/models/Comment";
import User from "@/models/User";

const PAGE_NUMBER = 1;
const PAGE_SIZE = 36;
const COMMENT_SORT_KEY = "BEST";

const getComments = async (req: NextRequest) => {
  try {
    const contentId = req.nextUrl.searchParams.get("contentId");
    const chapterId = req.nextUrl.searchParams.get("chapterId");
    const pageNumber =
      parseInt(req.nextUrl.searchParams.get("pageNumber")!) || PAGE_NUMBER;
    const pageSize =
      parseInt(req.nextUrl.searchParams.get("pageSize")!) || PAGE_SIZE;
    const commentSortKey =
      req.nextUrl.searchParams.get("commentSortKey") ?? COMMENT_SORT_KEY;

    if (!contentId)
      return NextResponse.json(
        {
          error: true,
          errorMessage: "Invalid query parameters contentId is required.",
        },
        { status: 400 },
      );

    const matchConditions = [{ contentId }, { chapterId }];

    const sortingConditions: Record<string, 1 | -1> =
      commentSortKey === "NEWEST"
        ? { createdAt: -1 }
        : commentSortKey === "OLDEST"
          ? { createdAt: 1 }
          : { likes: -1, createdAt: -1 };

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
          ],
        },
      },
    ]);

    const { totalComments = 0 } = aggregatedData[0].metaData[0] ?? {};
    const comments = aggregatedData[0].data ?? [];

    return NextResponse.json(
      {
        totalPages: Math.ceil(totalComments / pageSize),
        totalComments,
        pageNumber,
        comments,
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
      parentId,
      message,
      contentId,
      chapterId,
      userId,
    });

    return NextResponse.json({ error: false, comment }, { status: 201 });
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
