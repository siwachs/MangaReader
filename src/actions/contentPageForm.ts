"use server";

import { revalidatePath } from "next/cache";

import connectToMongoDB from "@/libs/db/connectToMongoDB";
import getServerSession from "@/libs/auth/getServerSession";
import Genre from "@/models/Genre";

export const addGenre = async (prevState: any, formData: FormData) => {
  try {
    await connectToMongoDB();

    const data = await getServerSession();
    if (!data || !data.user.isAdmin) {
      return {
        error: true,
        errorMessage:
          "An admin user is required for this operation. Please sign in with an admin account.",
      };
    }

    const genre = formData.get("genre") as string;
    const trimmedGenre = genre?.trim();
    if (!trimmedGenre)
      return { error: true, errorMessage: "Genre can't be empty." };

    const existingGenre = await Genre.findOne({ name: trimmedGenre });
    if (existingGenre)
      return { error: true, errorMessage: "Genre must be unique." };

    await Genre.create({ name: trimmedGenre });

    revalidatePath("/admin/content");
    return { error: false, errorMessage: undefined };
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  }
};

export const addOrUpdateContent = async (
  prevState: any,
  formData: FormData,
) => {
  return { error: false, errorMessage: undefined };
};
