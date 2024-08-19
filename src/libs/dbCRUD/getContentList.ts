import connectToMongoDB from "../db/connectToMongoDB";
import Content from "@/models/Content";

import { CONTENT_LIST_DEFAULT_LIMIT } from "@/constants";
import { partialContentForContentList } from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

type Tags =
  | "BannerContent"
  | "ReadWithEditor"
  | "CompletedClassic"
  | "WeeklyNovel"
  | "FreeRead";

type Status =
  | "Ongoing"
  | "Discontinued"
  | "Abandoned"
  | "Unscheduled"
  | "Completed";

type ContentListFilter = {
  filterBy?: "tags" | "genres" | "status";
  sortBy?: "trending" | "new" | "updatedToday";
  tags?: Tags[];
  genres?: string[];
  status?: Status;
};

function getFilterQuery(listFilter: ContentListFilter) {
  const { filterBy, tags, status } = listFilter;

  if (filterBy === "tags") return { tags: { $in: tags ?? [] } };
  if (filterBy === "status") return { status };
  return {};

  return { rating: -1, noOfViews: -1, noOfSubscribers: -1 };
}

function getSortQuery(listFilter: ContentListFilter) {
  const { sortBy } = listFilter;

  return {};
}

export default async function getContentList(
  listFilter: ContentListFilter,
  listLimit?: number,
) {
  try {
    await connectToMongoDB();
    const limit = listLimit ?? CONTENT_LIST_DEFAULT_LIMIT;
    const filterQuery = getFilterQuery(listFilter);
    const sortQuery = getSortQuery(listFilter);

    const contentDocs = await Content.find(filterQuery)
      .sort(sortQuery)
      .limit(limit);

    const formatedContentDocs = contentDocs.map((content) =>
      formatMongooseDoc(content.toObject()),
    );

    return JSON.parse(JSON.stringify(formatedContentDocs));
  } catch (error: any) {
    return {
      error: true,
      errorMessage: error.message,
    };
  }
}
