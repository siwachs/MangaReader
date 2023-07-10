import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import User from "@/models/User";

const validateSession = async (req, res, isAdmin) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return false;

  if (isAdmin) {
    try {
      const user = await User.findById(session.user.uid).select("isAdmin");
      if (user) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  return true;
};

export default validateSession;
