import Content from "@/models/Content";

import { transformText } from "@/lib/utils";

export const config = {
  runtime: "edge",
};

const handler = async (req, res) => {
  const {
    method,
    query: { keyword, selectedFields },
  } = req;

  switch (method) {
    case "GET":
      const transformedKeyword = transformText(keyword);
      const fieldsArray = selectedFields.split(",");
      const projection = {};

      for (const field of fieldsArray) {
        projection[field] = 1;
      }

      try {
        const contentList = await Content.aggregate([
          {
            $match: {
              $or: [
                {
                  title: {
                    $regex: transformedKeyword,
                    $options: "i", // case-insensitive
                  },
                },
                {
                  authorName: {
                    $regex: transformedKeyword,
                    $options: "i", // case-insensitive
                  },
                },
              ],
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
            $project: projection,
          },
        ]);

        res.status(200).json(contentList);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(501).json({ error: "Invalid Request." });
  }
};

export default handler;
