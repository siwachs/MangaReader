import validateSession from "@/lib/validateSession";

import connectToDB from "@/lib/connectToDB";
import Tag from "@/models/Tag";

const handler = async (req, res) => {
  await connectToDB();

  const { method } = req;
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
        const tags = await Tag.find({});
        res.status(200).json(tags);
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    case "POST":
      const { tagId, tagName } = req.body;
      try {
        const tag = await Tag.create({
          tagId,
          tagName,
        });

        res.status(200).json(tag);
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
