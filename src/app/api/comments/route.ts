import connectToMongoDb from "@/lib/connectToMongoDB";
import Comment from "@/models/Comment";
import { NextRequest, NextResponse } from "next/server";

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

    if (!contentId) {
      return NextResponse.json(
        {
          error: true,
          errorMessage: "Invalid Query Parameters",
        },
        { status: 400 },
      );
    }

    const matchConditions = [{ contentId }, { chapterId }];

    const sortingConditions: Record<string, 1 | -1> =
      commentSortKey === "NEWEST"
        ? { createdAt: -1 }
        : commentSortKey === "OLDEST"
          ? { createdAt: 1 }
          : { likes: -1, createdAt: -1 };

    await connectToMongoDb();
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

    const { totalComments } = aggregatedData[0].metaData[0] ?? pageSize;
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
    if (!contentId || !userId || !message.trim()) {
      return NextResponse.json(
        {
          error: true,
          errorMessage: "Invalid Body Bad Request",
        },
        { status: 400 },
      );
    }

    await connectToMongoDb();
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
