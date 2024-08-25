import { SortOrder } from "mongoose";

import connectToMongoDB from "../db/connectToMongoDB";
import Genre from "@/models/Genre";
import Content from "@/models/Content";

import { Tags, Status } from "@/types";
import { CONTENT_LIST_DEFAULT_PAGE_SIZE } from "@/constants";
import {
  partialContentForContentList,
  partialContentForBanner,
  partialContentForGenres,
  partialContentForHottestList,
  partialContentForGenrePageList,
} from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

export type ContentListFilter = {
  filterBy?: "tags" | "genres" | "status" | "genresPageList";
  sortBy?: "trending" | "new" | "updatedToday" | "hottest";
  tags?: Tags[];
  genres?: string[];
  status?: Status;
  populatePath?: string;
  populateSelect?: string;
};

async function getFilterQuery(listFilter: ContentListFilter) {
  const { filterBy, tags = [], status, genres = [] } = listFilter;

  switch (filterBy) {
    case "tags":
      return { tags: { $in: tags } };

    case "status":
      return { status };

    case "genres":
    case "genresPageList":
      if (genres.includes("all")) return status ? { status } : {};

      const genreIds = await Genre.find({
        name: { $in: genres.map((genre) => new RegExp(`^${genre}`, "i")) },
      }).select("_id");

      return status
        ? { genres: { $in: genreIds }, status }
        : { genres: { $in: genreIds } };

    default:
      return {};
  }
}

function getSortQuery(
  listFilter: ContentListFilter,
): Record<string, SortOrder> {
  const { sortBy } = listFilter;

  switch (sortBy) {
    case "trending":
    case "hottest":
      return { rating: -1, noOfViews: -1, noOfSubscribers: -1 };

    case "new":
      return { createdAt: -1 };

    case "updatedToday":
      return { chaptersUpdatedOn: -1 };

    default:
      return {};
  }
}

function getPartialContentSelect(listFilter: ContentListFilter) {
  const { filterBy, tags = [], sortBy } = listFilter;

  if (filterBy === "tags" && tags.includes("BannerContent"))
    return partialContentForBanner;

  if (filterBy === "genresPageList") return partialContentForGenrePageList;
  if (filterBy === "genres") return partialContentForGenres;

  if (sortBy === "hottest") return partialContentForHottestList;

  return partialContentForContentList;
}

function getProjectFields(partialContent: string) {
  const fields = partialContent.split(" ");
  const projection: any = {};

  fields.forEach((field) => {
    projection[field] = 1;
  });

  return projection;
}

export async function getContentListWithAggregation(
  listFilter: ContentListFilter,
  listPageNumber?: number,
  listSize?: number,
) {
  await connectToMongoDB();

  const pageSize = listSize ?? CONTENT_LIST_DEFAULT_PAGE_SIZE;
  const pageNumber = listPageNumber ?? 1;
  const skip = (pageNumber - 1) * pageSize;

  const filterQuery = await getFilterQuery(listFilter);
  const sortQuery: Record<string, 1 | -1> | {} = getSortQuery(listFilter);
  const partialContent = getPartialContentSelect(listFilter);
  const { populatePath = "", populateSelect = "" } = listFilter;

  const aggregatedResult = await Content.aggregate([
    {
      $facet: {
        metaData: [{ $count: "totalContent" }],
        data: [
          { $match: filterQuery },
          { $sort: sortQuery },
          { $skip: skip },
          { $limit: pageSize },
          {
            $lookup: {
              from: "Genres",
              let: { genreIds: "$genres" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$genreIds"],
                    },
                  },
                },
                { $project: { name: 1, description: 1 } },
              ],
              as: "genres",
            },
          },
          { $project: getProjectFields(partialContent) },
        ],
      },
    },
  ]);

  return JSON.stringify(aggregatedResult[0]["data"][0].genres);
}

export default async function getContentList(
  listFilter: ContentListFilter,
  listPageNumber?: number,
  listSize?: number,
) {
  try {
    await connectToMongoDB();

    const pageSize = listSize ?? CONTENT_LIST_DEFAULT_PAGE_SIZE;
    const pageNumber = listPageNumber ?? 1;
    const skip = (pageNumber - 1) * pageSize;

    const filterQuery = await getFilterQuery(listFilter);
    const sortQuery = getSortQuery(listFilter);
    const partialContent = getPartialContentSelect(listFilter);
    const { populatePath = "", populateSelect = "" } = listFilter;

    const contentDocs = await Content.find(filterQuery)
      .select(partialContent)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .populate(
        populatePath && populateSelect
          ? {
              path: populatePath,
              select: populateSelect,
            }
          : [],
      );

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
