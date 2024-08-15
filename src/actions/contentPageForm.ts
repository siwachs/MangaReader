"use server";

import { revalidatePath } from "next/cache";

import connectToMongoDB from "@/libs/db/connectToMongoDB";
import getServerSession from "@/libs/auth/getServerSession";
import Genre from "@/models/Genre";
import Content from "@/models/Content";

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

    const genre = (formData.get("genre") as string).trim();
    if (!genre) return { error: true, errorMessage: "Genre can't be empty." };

    const existingGenre = await Genre.findOne({ name: genre });
    if (existingGenre)
      return { error: true, errorMessage: "Genre must be unique." };

    await Genre.create({ name: genre });

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
  try {
    const thumbnail = formData.get("thumbnail");
    const poster = formData.get("poster");

    if (!thumbnail || !poster)
      return {
        error: true,
        errorMessage: "Pick a valid Thumbnail and Poster of size upto 3MB.",
      };

    const tags = formData.getAll("tags");

    const title = (formData.get("title") as string).trim();
    if (!title)
      return {
        error: true,
        errorMessage: "Title can't be empty.",
      };

    const status = formData.get("status");
    const genres = formData.getAll("genres");
    if (!genres.length)
      return {
        error: true,
        errorMessage: "Genres can't be empty.",
      };

    const author = (formData.get("author") as string).trim();
    if (!author)
      return {
        error: true,
        errorMessage: "Author can't be empty.",
      };

    const synonyms = (formData.get("synonyms") as string).trim();
    const synonymsArray = synonyms.split(",");

    const description = (formData.get("description") as string).trim();
    if (!description)
      return {
        error: true,
        errorMessage: "Description can't be empty.",
      };

    const imagesAndWallpapers = JSON.parse(
      formData.get("imagesAndWallpapers") as string,
    );

    const content = await Content.find({ title }).select("_id");
    if (content) return { error: false, errorMessage: "Title must be unique." };

    return { error: false, errorMessage: undefined };
  } catch (error: any) {
    return { error: false, errorMessage: error.message };
  }
};
