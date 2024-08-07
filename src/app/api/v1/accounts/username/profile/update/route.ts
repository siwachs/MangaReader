import { NextRequest } from "next/server";

import { serverError } from "@/libs/apiErrorResponse";
import connectToMongoDB from "@/libs/connectToMongoDB";
import getServerSession from "@/libs/getServerSession";
import User from "@/models/User";

const updateProfile = async (req: NextRequest) => {
  try {
  } catch (error: any) {
    return serverError(error.message);
  }
};

export { updateProfile as PUT };
