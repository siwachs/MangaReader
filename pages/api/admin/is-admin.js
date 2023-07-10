import connectToDB from "@/lib/connectToDB";
import User from "@/models/User";

export const config = {
  runtime: "edge",
};

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  if (!id) {
    return res.status(200).json({
      error: "Id field is undefined.",
    });
  }

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id).select("isAdmin");
        if (user) {
          return res.status(200).json(user);
        }
        res.status(404).json({
          error: "User not found.",
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
