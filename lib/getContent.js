import mongoose from "mongoose";

import Content from "@/models/Content";

const getContent = async (req, res) => {
  const {
    query: { content_id, page, limit, contentType, selectedFields, tagId },
  } = req;

  const queryArray = [];

  const integerPage = parseInt(page) || 1;
  const integerLimit = parseInt(limit) || 6;
  const skip = (integerPage - 1) * integerLimit;
  const fieldsArray = selectedFields.split(",") || [];
  const projection = {};
  for (const field of fieldsArray) {
    projection[field] = 1;
  }

  if (content_id) {
    try {
      const ObjectId = mongoose.Types.ObjectId;
      const content = await Content.aggregate([
        {
          $match: {
            _id: new ObjectId(content_id),
          },
        },

        {
          $addFields: {
            chaptersCount: { $size: "$chapters" },
            commentsCount: { $size: "$comments" },
          },
        },

        {
          $lookup: {
            from: "Tags",
            localField: "tags",
            foreignField: "_id",
            as: "populatedTags",
          },
        },

        {
          $lookup: {
            from: "Chapters",
            localField: "chapters",
            foreignField: "_id",
            as: "populatedChapters",
          },
        },

        {
          $project: {
            ...projection,
            chapters: 1,
            populatedChapters: {
              $map: {
                input: "$populatedChapters",
                as: "chapter",
                in: {
                  _id: "$$chapter._id",
                  createdAt: "$$chapter.createdAt",
                  chapterTitle: "$$chapter.chapterTitle",
                  noOfLikes: "$$chapter.noOfLikes",
                  noOfComments: { $size: "$$chapter.comments" },
                },
              },
            },
          },
        },
      ]);

      if (content[0]) {
        content[0].populatedChapters = content[0].chapters.map((chapterId) => {
          return content[0].populatedChapters.find(
            (item) => item._id.toString() === chapterId.toString()
          );
        });
        content[0].chapters = undefined;
        return res.status(200).json(content[0]);
      }
      return res.status(404).json({
        error: "Can not find content for given ID.",
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const sortingQuery =
    contentType === "recently-added" || tagId === "recently-added"
      ? { createdAt: -1 }
      : { newChaptersAddedAt: -1 };

  if (tagId || contentType === "trending" || contentType === "recommended") {
    queryArray.push({
      $lookup: {
        from: "Tags",
        localField: "tags",
        foreignField: "_id",
        as: "populatedTags",
      },
    });
  }

  queryArray.push({
    $sort: sortingQuery,
  });

  const contentTypeArray = [
    "topInternetSearch",
    "recommended",
    "sliderSlide",
    "massUpdate",
    "trending",
  ];

  const statusArray = ["completed", "discontinued", "ongoing", "unscheduled"];

  const tagIdsArray = ["all", "recently-added", "recently-updated"];

  if (contentTypeArray.includes(contentType) || tagId === "trending") {
    queryArray.push({
      $match: { contentType: contentType || tagId },
    });
  } else if (
    contentType === "recently-updated" ||
    contentType === "recently-added" ||
    tagIdsArray.includes(tagId)
  ) {
    queryArray.push({
      $match: {},
    });
  } else if (statusArray.includes(contentType) || statusArray.includes(tagId)) {
    queryArray.push({
      $match: { status: contentType || tagId },
    });
  } else if (tagId) {
    queryArray.push({
      $match: {
        "populatedTags.tagId": tagId,
      },
    });
  }

  queryArray.push({
    $skip: skip,
  });

  queryArray.push({
    $limit: integerLimit,
  });

  if (tagId) {
    queryArray.push({
      $addFields: {
        chapterCount: { $size: "$chapters" },
      },
    });
  }

  if (fieldsArray.length !== 0) {
    queryArray.push({
      $project: projection,
    });
  }

  try {
    if (tagId) {
      const countPipeline = queryArray.filter(
        (stage) => !("$skip" in stage || "$limit" in stage)
      );

      countPipeline.push({ $count: "total" });
      const result = await Content.aggregate(countPipeline);
      const totalDocs = result[0]?.total || 0;
      const totalPages = Math.ceil(totalDocs / integerLimit);

      const contentList = await Content.aggregate(queryArray);
      return res.status(200).json({ contentList, totalPages });
    }

    const contentList = await Content.aggregate(queryArray);
    return res.status(200).json(contentList);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getContent;
