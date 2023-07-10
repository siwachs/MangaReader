import connectToDB from "@/lib/connectToDB";
import Tag from "@/models/Tag";

const handler = async (req, res) => {
  await connectToDB();

  const {
    method,
    query: { key, value },
  } = req;

  switch (method) {
    case "GET":
      try {
        const tag = await Tag.findOne({ [key]: value.toLowerCase() });
        res.status(200).json({
          isAvail: !!!tag,
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
