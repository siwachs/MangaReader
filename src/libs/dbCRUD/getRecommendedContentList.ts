import connectToMongoDB from "../db/connectToMongoDB";
import Content from "@/models/Content";

import { Content as ContentType } from "@/types";
import formatMongooseDoc from "../db/formatMongooseDoc";

type RecommendedContentListResponse = {
  error: boolean;
  errorMessage?: string;
  contentList: ContentType[];
};

export default async function (): Promise<RecommendedContentListResponse> {
  try {
    await connectToMongoDB();

    const aggregatedContentList = await Content.aggregate([
      { $sample: { size: 6 } },
      {
        $lookup: {
          from: "Genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $project: {
          poster: 1,
          title: 1,
          "genres.name": 1,
        },
      },
    ]);

    const contentList = aggregatedContentList.map((content) =>
      formatMongooseDoc(content),
    );

    return {
      error: false,
      contentList: contentList as ContentType[],
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      error: true,
      errorMessage: error.message,
      contentList: [],
    };
  }
}
