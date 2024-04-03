import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import connectToDB from "@/lib/connectToDB";
import User from "@/models/User";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const {
    method,
    query: { id },
    body,
  } = req;

  if (!session || session.user.uid !== id)
    return res.status(401).json({
      error: "unauthenticated user is not allowed.",
    });

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (user) {
          return res.status(200).json(user);
        }
        return res.status(404).json({
          error: "User not found.",
        });
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    case "PUT":
      try {
        const profile = await User.findByIdAndUpdate(
          id,
          {
            ...body,
          },
          { new: true }
        );
        if (!profile)
          res.status(500).json({ error: "No user found for the given id." });
        else res.status(200).json(profile);
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) return res.status(200).json({ success: true });

        return res.status(404).json({
          error: "No user found for the given id.",
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
