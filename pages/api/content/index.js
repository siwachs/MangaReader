import validateSession from "@/lib/validateSession";

import connectToDB from "@/lib/connectToDB";
import Content from "@/models/Content";
import Comment from "@/models/Comment";

import getContent from "@/lib/getContent";

export const config = {
  runtime: "edge",
};

const handler = async (req, res) => {
  await connectToDB();

  const {
    method,
    body,
    query: { content_id },
  } = req;

  if (method === "POST" || method === "PUT" || method === "DELETE") {
    const session = await validateSession(req, res, true);

    if (!session)
      return res.status(401).json({
        error: "unauthenticated user is not allowed.",
      });
  }

  switch (method) {
    case "GET":
      try {
        return await getContent(req, res);
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    case "POST":
      try {
        const content = await Content.create({
          ...body,
        });

        res.status(200).json(content);
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    case "PUT":
      if (!content_id)
        return res.status(500).json({
          error: "No content Id is given for update.",
        });

      try {
        const content = await Content.findByIdAndUpdate(
          content_id,
          {
            ...body,
          },
          { new: true }
        )
          .select(
            "contentType displayImageThumbnail displayImagePoster title status authorName description tags"
          )
          .populate("tags");
        if (!content)
          res
            .status(500)
            .json({ error: "No updates are made for the given id." });
        else res.status(200).json(content);
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    case "DELETE":
      try {
        const content = await Content.findById(content_id);
        await Comment.deleteMany({
          _id: { $in: content.chapters },
        });
        await Content.findByIdAndDelete(content_id);
        res.status(200).json({
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    default:
      res.status(501).json({ error: "Invalid Request." });
  }
};

export default handler;
