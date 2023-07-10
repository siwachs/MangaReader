import validateSession from "@/lib/validateSession";

import connectToDB from "@/lib/connectToDB";
import Content from "@/models/Content";
import Chapter from "@/models/Chapter";

import { deleteFromDB } from "@/lib/deleteFromDB";

const handler = async (req, res) => {
  await connectToDB();

  const {
    method,
    query: { content_id, chapter_id, position, index, type, selectedFields },
    body,
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
      const selectedFieldsString = selectedFields.split(",").join(" ");
      try {
        const chapter = await Chapter.findById(chapter_id).select(
          selectedFieldsString
        );

        if (!chapter)
          return res.status(500).json({
            error: "No Chapter Found for this ID.",
          });

        res.status(200).json(chapter);
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    case "POST":
      if (!content_id)
        return res.status(500).json({
          message: "No content Id Defined.",
        });
      try {
        const content = await Content.findById(content_id).select("chapters");
        const chapter = await Chapter.create({
          ...body,
        });

        if (position === "afterIndex" && index) {
          content.chapters.splice(index, 0, chapter._id);
        } else if (position === "beginning") {
          content.chapters.unshift(chapter._id);
        } else {
          content.chapters.push(chapter._id);
        }

        content.newChaptersAddedAt = Date.now();

        await content.save();

        res.status(200).json(chapter);
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    case "PUT":
      break;
    case "DELETE":
      if (
        (type === "single" && (!content_id || !chapter_id)) ||
        (type === "all" && !content_id)
      )
        return res.status(500).json({
          message: "No Id Defined.",
        });

      try {
        await deleteFromDB(type, content_id, chapter_id);
        res.status(200).json({
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
        console.log(error);
      }
      break;
    default:
      res.status(501).json({ error: "Invalid Request." });
  }
};

export default handler;
