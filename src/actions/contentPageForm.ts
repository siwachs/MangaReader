"use server";

import { revalidatePath } from "next/cache";

import { partialContent } from "@/libs/mongooseSelect";
import connectToMongoDB from "@/libs/db/connectToMongoDB";
import getServerSession from "@/libs/auth/getServerSession";
import Genre from "@/models/Genre";
import Content from "@/models/Content";

import { isBase64Image } from "@/libs/validations";
import {
  moveFolder,
  uploadImageToFirebaseStorage,
} from "@/libs/firebaseStorage";
import { Content as ContentType } from "@/types";

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

const getValidContentPayload = (formData: FormData) => {
  const thumbnail = formData.get("thumbnail") as string;
  const poster = formData.get("poster") as string;

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

  return {
    tags,
    thumbnail,
    poster,
    title,
    status,
    genres,
    author,
    synonyms: synonymsArray,
    description,
    imagesAndWallpapers,
  };
};

const updateContent = async (
  contentId: string,
  validContentPayload: ContentType,
) => {
  const content = await Content.findById(contentId).select(partialContent);

  if (!content) return { error: true, errorMessage: "Invalid update request." };
  const { title, thumbnail, poster } = validContentPayload;

  const oldTitle = content.title;
  const isTitleUpdateRequest = title !== oldTitle;
  if (isTitleUpdateRequest && (await Content.findOne({ title }).select("_id")))
    return { error: true, errorMessage: "Title must be unique." };

  if (isBase64Image(thumbnail))
    validContentPayload.thumbnail = await uploadImageToFirebaseStorage(
      `Content/${oldTitle}/thumbnail`,
      thumbnail,
    );

  if (isBase64Image(poster))
    validContentPayload.poster = await uploadImageToFirebaseStorage(
      `Content/${oldTitle}/poster`,
      poster,
    );

  if (isTitleUpdateRequest) {
    const updatedUrls = await moveFolder(
      `Content/${oldTitle}`,
      `Content/${title}`,
    );

    validContentPayload.thumbnail =
      updatedUrls[validContentPayload.thumbnail] ??
      validContentPayload.thumbnail;

    validContentPayload.poster =
      updatedUrls[validContentPayload.poster] ?? validContentPayload.poster;
  }

  await Content.findByIdAndUpdate(contentId, validContentPayload);

  revalidatePath("/admin/content");
  return { error: false, errorMessage: undefined };
};

export const addOrUpdateContent = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const validContentPayload = getValidContentPayload(formData);
    if (validContentPayload.error) return validContentPayload;

    const contentId = (formData.get("contentId") as string).trim();
    if (contentId)
      return updateContent(contentId, validContentPayload as ContentType);

    const { title, thumbnail, poster } = validContentPayload as ContentType;
    if (await Content.findOne({ title }).select("_id"))
      return { error: true, errorMessage: "Title must be unique." };

    validContentPayload.thumbnail = await uploadImageToFirebaseStorage(
      `Content/${title}/thumbnail`,
      thumbnail,
    );
    validContentPayload.poster = await uploadImageToFirebaseStorage(
      `Content/${title}/poster`,
      poster,
    );

    await Content.create(validContentPayload);

    return { error: false, errorMessage: undefined };
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  }
};
