import connectToDB from "@/lib/connectToDB";
import User from "@/models/User";

export const config = {
  runtime: "edge",
};

const handler = async (req, res) => {
  await connectToDB();

  const {
    method,
    query: { keyword },
  } = req;

  switch (method) {
    case "GET":
      try {
        const userName = await User.findOne({ userName: keyword });
        if (userName)
          res.status(200).json({
            isAvail: false,
          });
        else
          res.status(200).json({
            isAvail: true,
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
