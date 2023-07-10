import connectToDB from "@/lib/connectToDB";
import Content from "@/models/Content";

const handler = async (req, res) => {
  await connectToDB();

  const {
    method,
    query: { content_id },
  } = req;

  switch (method) {
    case "PUT":
      try {
        const content = await Content.findById(content_id).select("noOfViews");
        content.noOfViews = content.noOfViews + 1;
        await content.save();
        res.status(200).json({
          noOfViews: content.noOfViews,
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
