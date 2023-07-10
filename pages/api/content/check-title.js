import connectToDB from "@/lib/connectToDB";
import Content from "@/models/Content";

const handler = async (req, res) => {
  await connectToDB();

  const {
    method,
    query: { title },
  } = req;

  switch (method) {
    case "GET":
      try {
        const content = await Content.findOne({ title: title.toLowerCase() });
        if (content) {
          res.status(200).json({ isAvail: false });
        } else {
          res.status(200).json({ isAvail: true });
        }
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
